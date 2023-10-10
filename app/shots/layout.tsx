import Footer from '@/components/shared/Footer'
import CategoryAndOrder from '@/components/widgets/CategoryAndOrder/index'
import React, { Suspense } from 'react'
import Loading from './loading'
// import Categories from '@/components/widgets/Categories'
// import Tabs from '@/components/widgets/Tabs'

type Props = {
    children: React.ReactNode
}
const ShotsLayout = ({ children }: Props) => {
    return (
        <div className='flex flex-col w-full h-full gap-4 shot_wrapper'>
            <div className='flex flex-col w-full h-full gap-6 px-4 md:px-12 lg:px-32'>
                <div className="sticky top-0 z-40 w-full">
                    <div className="w-full max-w-6xl py-2 mx-auto bg-black rounded-md">
                        <CategoryAndOrder integrationMode noCategory={false} />
                    </div>
                </div>
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </div>
            <Footer />
        </div>
    )
}

export default ShotsLayout