'use client'
import Link from 'next/link'
import React from 'react'
import { BiStats } from 'react-icons/bi'
import { MdHistory, MdWork } from 'react-icons/md'

type Props = {
    uid: string
}
const ProfileSidebar = ({ uid }: Props) => {
    return (
        <div className="flex flex-row gap-2 md:flex-col md:h-full h-fit md:w-72 w-fit shrink-0">
            <SidebarLink icon={<MdWork size={17} />} link={`${uid}/`} title='Работы' />
            <SidebarLink icon={<BiStats size={17} />} link={`${uid}/statistics`} title='Статистика' />
            <SidebarLink icon={<MdHistory size={17} />} link={`${uid}/history`} title='История' />
        </div>
    )
}

type LinkProps = {
    link: string
    title: string
    icon: React.ReactNode
}
const SidebarLink = ({ icon, link, title }: LinkProps) => {
    return (
        <Link href={link} className="flex items-center h-10 gap-2 px-3 rounded-lg W-full bg-neutral-900">
            { icon }
            {/* <MdHistory size={17} /> */}
            <span className='hidden md:inline text-neutral-200'>{title}</span>
        </Link>
    )
}

export default ProfileSidebar