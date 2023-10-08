import CategoryAndOrder from '@/components/widgets/CategoryAndOrder'
import SearchBar from '@/components/widgets/SearchBar'
import React, { Suspense } from 'react'
import Loading from './loading'
import Footer from '@/components/shared/Footer'

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
                <Suspense fallback={<Loading />}>
                    { children }
                </Suspense>
            </div>
            <Footer />
        </div>
    )
}

export default SearchLayout