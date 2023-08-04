'use client'
import { Badge, Button } from 'antd'
import React from 'react'
import { BiMessageRoundedDots, BiShare } from 'react-icons/bi'

const ShotPageToolBar = () => {
    return (
        <div className="absolute top-0 right-0 flex flex-col h-full gap-2 p-4 w-fit">
            <div className="sticky flex flex-col items-center w-full gap-4 h-fit top-12">
                <div className="border rounded-full w-9 h-9 border-neutral-700 bg-neutral-800" />
                <div className="flex flex-col w-full gap-2 h-fit">
                    <Button className='!p-2 !h-fit'><BiShare size={23} /></Button>
                    <Badge count={
                        <span className='flex items-center justify-center w-4 h-4 text-black bg-white rounded-full'>0</span>
                    } showZero color='blue'>
                        <Button className='!p-2 !h-fit'>
                            <BiMessageRoundedDots size={23} />
                        </Button>
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default ShotPageToolBar