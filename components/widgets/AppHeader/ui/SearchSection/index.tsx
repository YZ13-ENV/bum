'use client'
import { setSearchOpen } from '@/components/entities/search/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import SearchPlayground from './ui/SearchPlayground'

const SearchSection = () => {
    const isOpen = useAppSelector(state => state.search.isOpen)
    const dispatch = useAppDispatch()
    if (isOpen) {
        return (
            <SearchPlayground />
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