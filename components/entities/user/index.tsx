'use client'
import { auth } from '@/utils/app'
import { Button, Dropdown, MenuProps, QRCode, Space } from 'antd'
import Image from 'next/image'
import React, { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiChevronRight, BiLoaderAlt, BiLogOut, BiPlus, BiUser, BiUserCircle } from 'react-icons/bi'
import { useCookieState } from 'ahooks'
import { useRouter } from 'next/navigation'
import Avatar from '@/components/shared/ui/Avatar'
import { useAppDispatch, useAppSelector } from '../store/store'
import { setSession } from '../session/session'

const UserStatus = () => {
    const [user, loading] = useAuthState(auth)
    const [cookie, setCookie] = useCookieState('uid')
    const [isSub, setIsSub] = useState<boolean>(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const session = useAppSelector(state => state.watcher.session)
    const logOut = () => {
        dispatch(setSession({...session, uid: null}))
        auth.signOut()
    }
    const items: MenuProps['items'] = [
        {
            key: 1,
            disabled: true,
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
            key: 3,
            label: 'Поделиться работой',
            icon: <BiPlus size={17} />,
            itemIcon: <BiChevronRight size={17} />,
            onClick: () => router.push('/uploads/shot'),
        },
        {
            key: 4,
            disabled: true,
            label: <div className="flex w-full h-40 gap-2 p-4 border rounded-xl border-neutral-700 bg-neutral-900">
                <div className="flex items-center justify-center w-full h-full">
                    <QRCode value='https://design.darkmaterial.space' size={128} type='svg' />
                </div>
                {/* <div className="flex flex-col items-center justify-center w-full h-full"> */}
                    {/* <Space.Compact direction='vertical'>
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>4</Button>
                    </Space.Compact> */}
                {/* </div> */}
            </div>
        },
        {
            type: 'divider'
        },
        {
            key: 10,
            icon: <BiLogOut size={17} />,
            label: 'Выйти из аккаунта',
            danger: true,
            onClick: () => logOut()
        },
    ]
    const back_url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://design.darkmaterial.space'
    const checkIsSubscriber = async() => {
        if (user) {
            const res = await user.getIdTokenResult()
            const claims = res.claims
            if (claims && claims.isSubscriber) {
                setIsSub(claims.isSubscriber as boolean || undefined ? claims.isSubscriber as boolean : false)
            }
        }
    }
    useLayoutEffect(() => {
        checkIsSubscriber()
    },[user])
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
        return <Dropdown arrow menu={{ items }} trigger={['click']}><div><Avatar isSub={isSub} src={user.photoURL} size={36} /></div></Dropdown> 
    } else return <Button size='large' onClick={() => router.push(`https://auth.darkmaterial.space/auth/signin?back_url=${back_url}${session.sid && `&token=${session.sid}`}`)} 
    loading={loading} type='primary'>Войти</Button>
}

export default UserStatus