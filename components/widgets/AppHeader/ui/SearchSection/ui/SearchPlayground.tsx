import { setSearchOpen } from '@/components/entities/search/store'
import { useAppDispatch } from '@/components/entities/store/store'
import { DocShotData } from '@/types'
import { useClickAway } from 'ahooks'
import { Input, Button } from 'antd'
import Link from 'next/link'
import React, { ElementRef, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import SearchResults from './SearchResults'

const SearchPlayground = () => {
    const dispatch = useAppDispatch()
    const ref = useRef<ElementRef<'div'>>(null)
    const [q, setQ] = useState<string>('')
    useClickAway(() => {
        dispatch(setSearchOpen(false))
    }, ref);
    return (
        <div className="fixed top-0 left-0 z-30 w-full h-screen max-w-full p-2 pb-4 bg-black md:left-2 md:top-2 bg-opacity-40">
            <div ref={ref} 
            className={`flex flex-col w-full mx-auto border md:max-w-xl ${q.length === 0 ? 'h-96' : 'h-full'}  rounded-xl bg-neutral-900 border-neutral-700`}>
                <div className="flex items-center w-full gap-2 pl-3 pr-1 border-b h-fit border-neutral-700">
                    <BiSearch size={17} className='inline text-neutral-500'  />
                    <Input size='large' value={q} onChange={e => setQ(e.target.value)}
                    placeholder='Поиск' bordered={false} className='!px-0 !rounded-none' />
                    <Button onClick={() => {dispatch(setSearchOpen(false)); setQ('')}} type='text'>Отмена</Button>
                </div>
                {
                    q.length === 0
                    ? <div className='flex items-center justify-center w-full h-full'>
                        <span className='text-xs text-center text-neutral-300'>Введите что хотите найти</span>
                    </div>
                    :
                    <SearchResults q={q} setQ={setQ} />

                }
            </div>
        </div>
    )
}

export default SearchPlayground