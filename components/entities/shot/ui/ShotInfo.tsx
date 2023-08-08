// 'use client'
import { DocShotData } from '@/types'
import { Button, Space } from 'antd'
import React from 'react'
import { BiHeart, BiRightArrowAlt, BiShow } from 'react-icons/bi'
import UserRow from './UserRow'
import Link from 'next/link'

type Props = {
    shot: DocShotData
}
const ShotInfo = ({ shot }: Props) => {
    return (
        <div className="absolute bottom-0 left-0 flex flex-col w-full h-fit">
            <div className="flex items-center justify-end w-full gap-2 h-fit">
                <div className="flex items-center gap-2 px-3 w-fit h-fit rounded-l-lg py-1.5 bg-neutral-900">
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
            {/* <div className="flex items-center justify-center w-full h-full gap-2 p-4 border-t rounded-b-xl border-neutral-700 bg-neutral-900">
                <Link href={`/${shot.authorId}`} className="flex flex-col w-2/3 h-full gap-2">
                    <span className='text-lg font-semibold line-clamp-1 text-neutral-200'>{shot.title}</span>
                    <UserRow userId={shot.authorId} />
                </Link>
                <div className="flex flex-col w-1/3 h-full gap-1">
                    <div className="flex items-center justify-end w-full h-1/2">
                        <Button size='large'  href={`/${shot.authorId}/${shot.doc_id}`} shape='circle'><BiRightArrowAlt size={17} className='inline'/></Button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default ShotInfo