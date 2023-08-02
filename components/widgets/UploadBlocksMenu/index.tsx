'use client'
import { Button, Segmented } from 'antd'
import React from 'react'
import { BiPlus, BiLock } from 'react-icons/bi'

const UploadBlocksMenu = () => {
    return (
        <div className="flex flex-col w-full h-full max-w-sm gap-2 p-4">
            <div className="flex flex-col w-full h-full gap-2">
                <div className="flex items-center justify-between w-full gap-2 h-fit">
                    <span className='font-semibold text-neutral-200'>Блоки</span>
                    <Button className='!px-2'><BiPlus size={17} /></Button>
                </div>
                <div className="flex w-full h-fit">
                    <Segmented className='!w-full' options={['Добавленные', 'Блоки']} block />
                </div>
                <div className="flex flex-col w-full h-full gap-2">
                    <div className="flex flex-col items-center justify-center w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950">
                        <BiLock size={24} className='text-neutral-400' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadBlocksMenu