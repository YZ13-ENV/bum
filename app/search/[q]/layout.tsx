import SearchBar from '@/components/widgets/SearchBar'
import Tabs from '@/components/widgets/Tabs'
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
            <div className="flex items-center justify-center w-full h-fit">
                <SearchBar q={decodeURI(params.q)} />
            </div>
            <div className='flex flex-col w-full h-full p-4 md:py-4 md:px-12'>
                <Tabs prefix={`/search/${params.q}`} />
                { children }
            </div>
        </div>
    )
}

export default SearchLayout