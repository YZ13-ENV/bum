import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchSection = () => {
    return (
        <div className="w-full max-w-full md:max-w-xs">
            <div className="flex items-center w-full gap-1 px-3 border rounded-lg h-9 border-neutral-700 bg-neutral-900">
                <BiSearch size={17} className='inline text-neutral-500'  />
                <span className='text-sm text-neutral-500'>Поиск</span>
            </div>
        </div>
    )
}

export default SearchSection