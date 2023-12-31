import CategoryAndOrder from '@/components/widgets/CategoryAndOrder'
import SearchBar from '@/components/widgets/SearchBar'
import React, { Suspense } from 'react'
import Loading from './loading'
import Footer from '@/components/shared/Footer'
import AppHeader from '@/components/widgets/AppHeader'

type Props = {
    params: {
        q: string
    }
    children: React.ReactNode
}
const SearchLayout = ({ params, children }: Props) => {
    return (
        <div className='flex flex-col w-full h-full min-h-screen gap-4'>
            <AppHeader />
            <div className="flex items-center justify-center w-full px-4 h-fit">
                <SearchBar q={decodeURI(params.q)} />
            </div>
            <div className='flex flex-col w-full h-full gap-6'>
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