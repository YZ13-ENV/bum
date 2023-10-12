'use client'
import { auth } from '@/utils/app'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React, { useLayoutEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiStats } from 'react-icons/bi'
import { BsStars } from 'react-icons/bs'
import { MdHistory, MdWork } from 'react-icons/md'
import { RiUser5Line } from 'react-icons/ri'
import ProfileActions from './ProfileActions'
import { useAppSelector } from '@/components/entities/store/store'

type Props = {
    uid: string
}
const ProfileSidebar = ({ uid }: Props) => {
    const path = usePathname()
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    useLayoutEffect(() => {
        if (user) {
            if (user.uid !== uid) {
                if (path.endsWith('/recommendations')) redirect(`/${uid}`)
                if (path.endsWith('/statistics')) redirect(`/${uid}`)
                if (path.endsWith('/history')) redirect(`/${uid}`)
            }
            if (!isSub) {
                if (path.endsWith('/recommendations')) redirect(`/${uid}`)
            }
        } else {
            if (path.endsWith('/recommendations')) redirect(`/${uid}`)
            if (path.endsWith('/statistics')) redirect(`/${uid}`)
            if (path.endsWith('/history')) redirect(`/${uid}`)
        }
    }, [user, uid, path])
    return (
        <div className="flex flex-col h-full gap-2 md:w-72 w-fit shrink-0">
            {
                user?.uid !== uid && <ProfileActions uid={uid} />
            }
            <SidebarLink active={path.endsWith(uid)} icon={<MdWork className='text-inherit' size={17} />} link={`/${uid}/`} title='Работы' />
            <SidebarLink active={path.endsWith('/bio')} icon={<RiUser5Line className='text-inherit' size={17} />} link={`/${uid}/bio`} title='Биография' />
            {
                (!user || (user && user.uid === uid)) &&
                <>
                    {
                        isSub &&
                        <>
                            <SidebarLink beta active={path.endsWith('/recommendations')} icon={<BsStars className='text-inherit' size={17} />} link={`/${uid}/recommendations`} title='Рекомендации' />
                        </>
                    }
                    <SidebarLink active={path.endsWith('/statistics')} icon={<BiStats className='text-inherit' size={17} />} link={`/${uid}/statistics`} title='Статистика' />
                    <SidebarLink active={path.endsWith('/history')} icon={<MdHistory className='text-inherit' size={17} />} link={`/${uid}/history`} title='История' />
                </>
            }
        </div>
    )
}

type LinkProps = {
    link: string
    title: string
    icon: React.ReactNode
    active?: boolean
    beta?: boolean
}
const SidebarLink = ({ icon, link, title, active=false, beta=false }: LinkProps) => {
    return (
        <Link href={link} className={`flex items-center h-10 gap-2 px-3 rounded-lg W-full duration-500 transition-colors ${active ? 'text-black bg-white' : 'text-neutral-200 hover:bg-neutral-800 bg-neutral-900'}`}>
            { icon }
            <span className="hidden md:inline text-inherit">{title} { beta && <sup>Beta</sup>}</span>
        </Link>
    )
}

export default ProfileSidebar