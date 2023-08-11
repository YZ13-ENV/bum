'use client'
import { auth } from '@/utils/app'
import { Button, Dropdown, MenuProps } from 'antd'
import Image from 'next/image'
import React, { useLayoutEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiChevronRight, BiLoaderAlt, BiLogOut, BiUser, BiUserCircle } from 'react-icons/bi'
import { useCookieState } from 'ahooks'
import { useRouter } from 'next/navigation'

const UserStatus = () => {
    const [user, loading] = useAuthState(auth)
    const [cookie, setCookie] = useCookieState('uid')
    const router = useRouter()
    const items: MenuProps['items'] = [
        {
            key: 1,
            label: <div className="flex items-center gap-2 w-52 h-9">
                {
                    user ?
                    user.photoURL ? <Image src={user.photoURL} className='rounded-full' width={36} height={36} alt='photo-url' />
                    : <div className='flex items-center justify-center rounded-full w-9 h-9 bg-neutral-900'><BiUser size={15} /></div>
                    : null
                }
                <div className="flex flex-col w-full h-full">
                    <span className='text-sm font-semibold text-neutral-200'>{user?.displayName || 'Пользователь'}</span>
                    <span className='text-xs text-neutral-400'>{user?.email || ''}</span>
                </div>
            </div>
        },
        {
            type: 'divider'
        },
        {
            key: 2,
            label: 'Перейти в профиль',
            icon: <BiUserCircle size={17} />,
            onClick: () => router.push(`/${user?.uid}`),
            itemIcon: <BiChevronRight size={17} />
        },
        {
            type: 'divider'
        },
        {
            key: 4,
            icon: <BiLogOut size={17} />,
            label: 'Выйти из аккаунта',
            danger: true,
            onClick: () => auth.signOut()
        },
    ]

    useLayoutEffect(() => {
        if (!cookie) {
            auth.signOut()
        }
    },[cookie])
    if (loading) {
        return (
            <div className="flex items-center justify-center border rounded-full w-9 h-9 border-neutral-700 bg-neutral-900">
                <BiUser size={13} />
                <BiLoaderAlt className='absolute animate-spin' size={36} />
            </div>
        )
    }
    if (user) {
        if (user.photoURL) {
            return <Dropdown arrow menu={{items}}>
                <Image src={user.photoURL} className='rounded-full' width={36} height={36} alt='photo-url' />
            </Dropdown> 
        } else return <Dropdown arrow menu={{items}}>
            <div className="flex items-center justify-center border rounded-full w-9 h-9 border-neutral-700 bg-neutral-900">
                <BiUser size={15} />
            </div>
        </Dropdown>
    } else return <Button size='large' href='/auth' loading={loading} type='primary'>Войти</Button>
}

export default UserStatus