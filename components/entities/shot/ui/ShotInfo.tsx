// 'use client'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Avatar } from 'antd'
import Link from 'next/link'
import React from 'react'
import { BiChevronRight, BiHeart, BiShow } from 'react-icons/bi'

type Props = {
    shot: DocShotData
}
const getShortData = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET' })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        console.log(e)
        return null
    }
}
const ShotInfo = async({ shot }: Props) => {
    const user = await getShortData(shot.authorId)
    return (
        <div className="absolute bottom-0 left-0 flex flex-col w-full h-fit">
            <div className="relative flex items-center justify-between w-full gap-2 h-fit">
                <Link href={`/${shot.authorId}`} className="absolute left-0 w-fit h-fit flex -bottom-20 group-hover:bottom-0 items-center transition-all gap-2 px-3 py-1.5 rounded-r-lg bg-neutral-50 dark:bg-neutral-900">
                    <Avatar src={user?.photoUrl} size={'small'} />
                    <span className='text-sm font-medium text-neutral-800 dark:text-neutral-200'>{user?.displayName || 'Пользователь'}</span>
                    <BiChevronRight size={17} />
                </Link>
                <div className="absolute right-0 flex items-center gap-2 px-3 bottom-0 transition-all w-fit h-fit rounded-l-lg py-1.5 bg-neutral-50 dark:bg-neutral-900">
                    <div className='flex items-center gap-2 w-fit h-fit text-neutral-800 dark:text-neutral-200'>
                        <BiShow size={15} className='text-inherit' />
                        <span className='text-sm text-inherit'>{shot.views.length}</span>
                    </div>
                    <div className='flex items-center gap-2 w-fit h-fit text-neutral-800 dark:text-neutral-200'>
                        <BiHeart size={15} className='text-inherit' />
                        <span className='text-sm text-inherit'>{shot.views.length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShotInfo