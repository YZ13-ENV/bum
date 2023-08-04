'use client'
import { DocShotData } from '@/types'
import { Button, Space } from 'antd'
import React from 'react'
import { BiHeart, BiRightArrowAlt, BiShow } from 'react-icons/bi'
import UserRow from './UserRow'

type Props = {
    shot: DocShotData
}
const ShotInfo = ({ shot }: Props) => {
    // console.log(shot);
    return (
        <div className="absolute left-0 flex flex-col w-full transition-all duration-700 delay-250 -bottom-24 group-hover:bottom-0 h-fit">
            <div className="flex items-center justify-end w-full gap-2 h-fit">
                <div className="flex items-center gap-2 p-2 w-fit h-fit bg-opacity-40 rounded-tl-xl bg-neutral-950">
                    <div className='flex items-center gap-2 w-fit h-fit'>
                        <BiShow size={15} />
                        <span className='text-sm text-neutral-200'>{shot.views.length}</span>
                    </div>
                    <div className='flex items-center gap-2 w-fit h-fit'>
                        <BiHeart size={15} />
                        <span className='text-sm text-neutral-200'>{shot.views.length}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full h-full gap-2 p-4 border-t rounded-b-2xl border-neutral-700 bg-opacity-40 backdrop-blur-sm bg-neutral-950">
                <div className="flex flex-col w-2/3 h-full gap-2">
                    <span className='text-lg font-semibold text-neutral-200'>{shot.title}</span>
                    <UserRow userId={shot.authorId} />

                </div>
                <div className="flex flex-col w-1/3 h-full gap-1">
                    <div className="flex items-center justify-end w-full h-1/2">
                        <Button href={`/shot/${shot.authorId}-${shot.doc_id}`} shape='circle'><BiRightArrowAlt size={17} className='inline'/></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShotInfo