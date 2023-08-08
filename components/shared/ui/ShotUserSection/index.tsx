import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiBookmark, BiHeart, BiUser } from 'react-icons/bi'

type Props = {
    photoUrl: string | null
    displayName: string | null
    title: string
    userId: string
}
const ShotUserSection = ({ photoUrl, userId, title, displayName }: Props) => {
    return (
        <div className="flex items-center justify-between w-full max-w-2xl gap-1 mx-auto h-fit">
            <div className="flex items-center w-full gap-4 h-fit">
                <Link href={`/${userId}`}>
                    {
                        photoUrl
                        ? <Image className='rounded-full shrink-0' src={photoUrl} width={56} height={56} alt='user-photo' />
                        : <div className="flex items-center justify-center border rounded-full w-14 h-14 shrink-0 bg-neutral-800 border-neutral-700">
                            <BiUser size={27} />
                        </div>
                    }
                </Link>
                <div className="flex flex-col w-full h-full gap-1">
                    <span className='text-2xl font-semibold text-neutral-200'>{title}</span>
                    <span className='text-xs text-neutral-400'>{displayName || 'Пользователь'}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 w-fit h-fit">
                <Button className='!p-2 !h-fit'><BiHeart size={23} /></Button>
                <Button className='!p-2 !h-fit'><BiBookmark size={23} /></Button>
            </div>
        </div>
    )
}

export default ShotUserSection