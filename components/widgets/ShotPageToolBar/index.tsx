'use client'
import { DocShotData, ShortUserData } from '@/types'
import { Badge, Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiMessageRoundedDots, BiShare, BiUser } from 'react-icons/bi'

type Props = {
    shot: DocShotData
    user: ShortUserData | null
    userId: string
}
const ShotPageToolBar = ({ shot, user, userId }: Props) => {
    return (
        <div className="absolute top-0 right-0 flex flex-col min-h-full gap-2 p-4 w-fit">
            <div className="sticky flex flex-col items-center w-full gap-4 h-fit top-12">
                <Link href={`/${userId}`}>
                    {
                                user 
                                ? user.photoUrl
                                ? <Image className='rounded-full shrink-0' src={user.photoUrl} width={36} height={36} alt='user-photo' />
                                : <div className="flex items-center justify-center border rounded-full w-9 h-9 shrink-0 border-neutral-700 bg-neutral-800">
                                    <BiUser size={17} />
                                </div>
                                : <div className="border rounded-full w-9 h-9 shrink-0 border-neutral-700 bg-neutral-800" />
                    }
                </Link>
                <div className="flex flex-col w-full gap-2 h-fit">
                    <Button className='!p-2 !h-fit'><BiShare size={23} /></Button>
                    <Badge count={
                        <span className='flex items-center justify-center w-4 h-4 text-black bg-white rounded-full'>0</span>
                    } showZero color='blue'>
                        <Button disabled={!shot.needFeedback} className='!p-2 !h-fit'>
                            <BiMessageRoundedDots size={23} />
                        </Button>
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default ShotPageToolBar