import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import ShotActions from './ui/ShotActions'
import { DocShotData } from '@/types'
import Avatar from '@/components/shared/ui/Avatar'

type Props = {
    photoUrl: string | null
    displayName: string | null
    title: string
    userId: string
    shot: DocShotData
}
const ShotUserSection = ({ photoUrl, userId, title, displayName, shot }: Props) => {
    return (
        <div className="flex items-center justify-between w-full max-w-2xl gap-1 px-4 py-2 mx-auto bg-black rounded-2xl h-fit">
            <div className="flex items-center w-full gap-4 h-fit">
                <Link href={`/${userId}`}>
                    <Avatar src={photoUrl} size={56} />
                </Link>
                <div className="flex flex-col w-full h-full gap-1">
                    <span className='text-2xl font-bold text-neutral-200'>{title}</span>
                    <span className='text-xs text-neutral-400'>{displayName || 'Пользователь'}</span>
                </div>
            </div>
            <ShotActions shot={shot} />
        </div>
    )
}

export default ShotUserSection