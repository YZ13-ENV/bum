'use client'
import { setSearchOpen } from '@/components/entities/search/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { BiSearch } from 'react-icons/bi'
import SearchPlayground from './ui/SearchPlayground'
import { Button } from 'antd'

const SearchSection = () => {
    const isOpen = useAppSelector(state => state.search.isOpen)
    const isSubscriber = useAppSelector(state => state.user.isSubscriber)
    const dispatch = useAppDispatch()
    if (isOpen) {
        return (
            <>
                <div className="flex items-center w-full h-10 max-w-md gap-2 px-3 border rounded-lg border-neutral-900 bg-neutral-900">
                    <BiSearch size={17} />
                    <span className='text-sm text-neutral-400'>Поиск</span>
                </div>
                <SearchPlayground />
            </>
        )
    }
    if (isSubscriber) {
        return (
            <div onClick={() => dispatch(setSearchOpen(true))} className="flex items-center w-full h-10 max-w-md gap-2 px-3 border rounded-lg border-neutral-900 hover:border-neutral-800 bg-neutral-900">
                <BiSearch size={17} />
                <span className='text-sm text-neutral-400'>Поиск</span>
            </div>
        )
    }
    return (
        <Button size='large' onClick={() => dispatch(setSearchOpen(true))}>
            <BiSearch size={17} />
        </Button>
    )
}

export default SearchSection