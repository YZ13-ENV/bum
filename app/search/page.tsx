'use client'
import { Button, Input } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'

const SearchPage = () => {
    const [text, setText] = useState<string>('')
    const router = useRouter()
    return (
        <div className='flex flex-col items-center justify-center w-full h-full px-4 shot_wrapper'>
            <div className="flex items-center justify-center w-full max-w-lg gap-2">
                {
                    text.length <= 2 &&
                    <Button href='/shots/popular' type='text' size='large' icon={<BiLeftArrowAlt size={17} className='inline mb-0.5' />}>Домой</Button>
                }
                <div className="flex items-center w-full max-w-md border rounded-lg h-9 bg-neutral-900 border-neutral-800">
                    <Input size='large' bordered={false} onChange={e => setText(e.target.value)} value={text}
                    onKeyUp={e => e.key === 'Enter' && router.push(`/search/${text}/popular`)} placeholder='Введите что хотите найти' />
                </div>
                { text.length > 2 && <Button size='large' onClick={() => router.push(`/search/${text}/popular`)} type='primary'>Найти</Button> }
            </div>
        </div>
    )
}

export default SearchPage