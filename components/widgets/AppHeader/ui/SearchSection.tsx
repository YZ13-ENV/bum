'use client'
import { setSearchOpen } from '@/components/entities/search/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { useClickAway } from 'ahooks'
import { Input } from 'antd'
import React, { ElementRef, useRef } from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchSection = () => {
    const isOpen = useAppSelector(state => state.search.isOpen)
    const dispatch = useAppDispatch()
    const ref = useRef<ElementRef<'div'>>(null)
    useClickAway(() => {
        dispatch(setSearchOpen(false))
    }, ref);
    if (isOpen) {
        return (
            <div className="relative w-full max-w-full h-2/3 md:max-w-md">
                <div ref={ref} className="absolute top-0 left-0 z-20 flex flex-col w-full border h-96 rounded-xl bg-neutral-900 border-neutral-700">
                    <div className="flex items-center w-full gap-2 px-3 border-b h-9 border-neutral-700">
                        <BiSearch size={17} className='inline text-neutral-500'  />
                        <Input size='large' placeholder='Поиск' bordered={false} className='!p-0 !rounded-none' />
                    </div>
                    <div className="flex flex-col w-full h-full p-2">
                        <div className="w-full h-full rounded-xl bg-neutral-800"></div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div onClick={() => dispatch(setSearchOpen(true))} className="w-full max-w-full md:max-w-xs">
            <div className="flex items-center w-full gap-1 px-3 border rounded-lg h-9 border-neutral-700 bg-neutral-900">
                <BiSearch size={17} className='inline text-neutral-500'  />
                <span className='text-sm text-neutral-500'>Поиск</span>
            </div>
        </div>
    )
}

export default SearchSection