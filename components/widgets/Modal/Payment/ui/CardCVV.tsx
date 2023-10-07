'use client'
import { Input } from 'antd'
import React, { useState } from 'react'

const CardCVV = () => {
    const [cvv, setCVV] = useState<number>(0)
    return (
        <div className="flex flex-col w-1/2 gap-1 h-fit">
            <span className='text-sm text-neutral-300'>CVV</span>
            <Input size='large' value={cvv || ''} onChange={e => setCVV(parseInt(e.target.value))}  placeholder='***' />
        </div>
    )
}

export default CardCVV