'use client'
import { auth } from '@/utils/app'
import { Button, Dropdown, MenuProps } from 'antd'
import Image from 'next/image'
import { useLayoutEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiChevronRight, BiCog, BiLoaderAlt, BiLogOut, BiPlus, BiUser, BiUserCircle } from 'react-icons/bi'
import { useCookieState, useLocalStorageState } from 'ahooks'
import { useRouter } from 'next/navigation'
import Avatar from '@/components/shared/Avatar'
import { useAppDispatch, useAppSelector } from '../store/store'
import { setSession } from '../session/session'
import { setSubscribeState } from './store'
import SessionSection from './ui/SessionSection'
import { useMediaQuery } from 'react-responsive'

type Props = {
    showDropdown?: boolean
}
const UserStatus = ({ showDropdown=true }: Props) => {
    const [sid, setSid] = useLocalStorageState<string | null>( 'sid', { defaultValue: null } );
    const [user, loading] = useAuthState(auth)
    const [cookie, setCookie] = useCookieState('uid')
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const isSub = useAppSelector(state => state.user.isSubscriber)
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
                    <span className='text-sm font-semibold line-clamp-1 text-neutral-200'>{user?.displayName || 'Пользователь'}</span>
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
            type: 'group',
            key: 4,
            className: '!px-0',
            label: <SessionSection />
        },
        {
            key: 5,
            label: 'Настройки',
            icon: <BiCog size={17} />,
            onClick: () => router.push('https://darkmaterial.space/profile'),
            itemIcon: <BiChevronRight size={17} />
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
                dispatch(setSubscribeState(claims.isSubscriber as boolean || undefined ? claims.isSubscriber as boolean : false))
            }
            if (claims && !claims.isSubscriber) dispatch(setSubscribeState(false))
        } else dispatch(setSubscribeState(false))
    }
    useLayoutEffect(() => {
        checkIsSubscriber()
    },[user?.uid])
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
        if (showDropdown) {
            return <Dropdown arrow menu={{ items }} trigger={['click']}><div><Avatar isSub={isSub} noLabel={isTabletOrMobile ? true : false} src={user.photoURL} size={36} /></div></Dropdown> 
        } else return <Avatar isSub={isSub} noLabel={isTabletOrMobile ? true : false} src={user.photoURL} size={36} />
    } else return <Button size='large' onClick={() => router.push(`https://auth.darkmaterial.space/auth/signin?back_url=${back_url}${sid ? `&token=${sid}` : ''}`)} 
    loading={loading} type='primary'>Войти</Button>
}

export default UserStatus