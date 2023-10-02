import CategoryAndOrder from '@/components/widgets/CategoryAndOrder'
import SearchBar from '@/components/widgets/SearchBar'
import React from 'react'

type Props = {
    params: {
        q: string
    }
    children: React.ReactNode
}
const SearchLayout = ({ params, children }: Props) => {
    return (
        <div className='flex flex-col w-full h-full gap-4'>
            <div className="flex items-center justify-center w-full px-4 h-fit">
                <SearchBar q={decodeURI(params.q)} />
            </div>
            <div className='flex flex-col w-full h-full gap-4 p-4 md:py-4 md:px-12'>
                <CategoryAndOrder />
                { children }
            </div>
        </div>
    )
}

export default SearchLayout