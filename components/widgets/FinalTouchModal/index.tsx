'use client'
import { Button } from 'antd'
import React from 'react'
import { BiX } from 'react-icons/bi'

const FinalTouchModal = () => {
    const [modal, setModal] = React.useState<boolean>(false)
    if (!modal) return null
    return (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-70'>
            <div className="flex flex-col w-full max-w-4xl gap-3 p-3 h-3/4 rounded-xl shrink-0 bg-neutral-950">
                <div className="flex items-center justify-between w-full h-fit">
                    <span className='text-xl font-semibold text-neutral-200'>Финальные штрихи</span>
                    <Button type='text'><BiX size={17} /></Button>
                </div>
                <div className="flex items-start w-full h-full gap-2">
                    <div className="flex flex-col w-2/6 h-full gap-2">
                        <div className="w-full h-48 rounded-xl bg-neutral-800"></div>
                    </div>
                    <div className="w-0.5 h-full bg-neutral-800" />
                    <div className="w-4/6 h-full"></div>
                </div>
            </div>
        </div>
    )
}

export default FinalTouchModal