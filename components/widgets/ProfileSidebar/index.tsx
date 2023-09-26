'use client'
import { auth } from '@/utils/app'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React, { useLayoutEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiStats } from 'react-icons/bi'
import { MdHistory, MdWork } from 'react-icons/md'

type Props = {
    uid: string
}
const ProfileSidebar = ({ uid }: Props) => {
    const path = usePathname()
    const [user] = useAuthState(auth)
    useLayoutEffect(() => {
        if (user) {
            if (user.uid !== uid) {
                if (path.endsWith('/statistics')) redirect(`/${uid}`)
                if (path.endsWith('/history')) redirect(`/${uid}`)
            }
        } else {
            if (path.endsWith('/statistics')) redirect(`/${uid}`)
            if (path.endsWith('/history')) redirect(`/${uid}`)
        }
    }, [user, uid, path])
    return (
        <div className="flex flex-col h-full gap-2 md:w-72 w-fit shrink-0">
            <SidebarLink active={path.endsWith(uid)} icon={<MdWork className='text-inherit' size={17} />} link={`/${uid}/`} title='Работы' />
            {
                (!user || (user && user.uid === uid)) &&
                <>
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
}
const SidebarLink = ({ icon, link, title, active=false }: LinkProps) => {
    return (
        <Link href={link} className={`flex items-center h-10 gap-2 px-3 rounded-lg W-full duration-500 transition-colors ${active ? 'text-black bg-white' : 'text-neutral-200 hover:bg-neutral-800 bg-neutral-900'}`}>
            { icon }
            <span className="hidden md:inline text-inherit">{title}</span>
        </Link>
    )
}

export default ProfileSidebar