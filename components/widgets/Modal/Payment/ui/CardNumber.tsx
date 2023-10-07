'use client'
import { Input } from 'antd'
import React, { useState } from 'react'

const CardNumber = () => {
    const [first, setFirst] = useState<number>(0)
    const [second, setSecond] = useState<number>(0)
    const [third, setThird] = useState<number>(0)
    const [fourth, setFourth] = useState<number>(0)
    return (
        <div className="flex flex-col w-full gap-1 h-fit">
            <span className='text-sm text-neutral-300'>Номер карты</span>
            <div className="flex items-center w-full gap-2 h-fit">
                <Input id='card-1' className='!text-center' size='large' value={first || ''} onChange={e => setFirst(parseInt(e.target.value))} maxLength={4} placeholder='****' />
                <Input id='card-2' className='!text-center' size='large' value={second || ''} onChange={e => setSecond(parseInt(e.target.value))} maxLength={4} placeholder='****' />
                <Input id='card-3' className='!text-center' size='large' value={third || ''} onChange={e => setThird(parseInt(e.target.value))} maxLength={4} placeholder='****' />
                <Input id='card-4' className='!text-center' size='large' value={fourth || ''} onChange={e => setFourth(parseInt(e.target.value))} maxLength={4} placeholder='****' />
            </div>
        </div>
    )
}

export default CardNumber