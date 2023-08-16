'use client'
import { setSearchOpen } from '@/components/entities/search/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import SearchPlayground from './ui/SearchPlayground'
import { Button } from 'antd'

const SearchSection = () => {
    const isOpen = useAppSelector(state => state.search.isOpen)
    const dispatch = useAppDispatch()
    if (isOpen) {
        return (
            <SearchPlayground />
        )
    }
    return (
        <Button size='large' onClick={() => dispatch(setSearchOpen(true))}>
            <BiSearch size={17} />
        </Button>
    )
}

export default SearchSection