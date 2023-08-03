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
    console.log(shot);
    return (
        <div className="absolute left-0 flex items-center justify-center w-full gap-2 p-2 transition-all duration-700 border-t delay-250 -bottom-28 group-hover:bottom-0 h-fit rounded-b-2xl border-neutral-700 bg-opacity-60 backdrop-blur-sm bg-neutral-800">
            <div className="flex flex-col w-2/3 h-full gap-2">
                <span className='text-lg font-semibold text-neutral-200'>{shot.title}</span>
                <UserRow userId={shot.authorId} />

            </div>
            <div className="flex flex-col w-1/3 h-full gap-1">
                <div className="flex items-center justify-end w-full h-1/2">
                    <Space.Compact block>
                        <Button block icon={<BiShow size={15} className='inline mb-1' />}> {shot.views.length}</Button>
                        <Button block icon={<BiHeart size={15} className='inline mb-1' />}> {shot.likes.length}</Button>
                    </Space.Compact>
                </div>
                <div className="flex items-center justify-end w-full h-1/2">
                    <Button href={`/shot/${shot.authorId}-${shot.doc_id}`} block>Посмотреть <BiRightArrowAlt size={17} className='inline mb-1'/></Button>
                </div>
            </div>
        </div>
    )
}

export default ShotInfo