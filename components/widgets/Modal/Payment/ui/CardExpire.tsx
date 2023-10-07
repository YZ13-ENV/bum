'use client'
import { useDebounceEffect } from 'ahooks'
import { Input, InputRef } from 'antd'
import React, { useRef, useState } from 'react'

const CardExpire = () => {
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(0)
    return (
        <div className="flex flex-col w-1/2 gap-1 h-fit">
            <span className='text-sm text-neutral-300'>Срок годности</span>
            <div className="flex items-center w-full gap-2 h-fit">
                <Input size='large' value={month || ''} maxLength={2} onChange={e => setMonth(parseInt(e.target.value))} placeholder='Месяц' />
                <span>/</span>
                <Input size='large' value={year || ''} maxLength={4} onChange={e => setYear(parseInt(e.target.value))} placeholder='Год' />
            </div>
        </div>
    )
}

export default CardExpire