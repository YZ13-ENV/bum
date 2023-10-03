import Footer from '@/components/shared/Footer'
import CategoryAndOrder from '@/components/widgets/CategoryAndOrder/index'
import React, { Suspense } from 'react'
import Loading from '../search/[q]/loading'
// import Categories from '@/components/widgets/Categories'
// import Tabs from '@/components/widgets/Tabs'

type Props = {
    children: React.ReactNode
}
const ShotsLayout = ({ children }: Props) => {
    return (
        <div className='flex flex-col w-full h-full gap-4 shot_wrapper'>
            <div className='flex flex-col w-full h-full gap-6 px-4 md:px-12'>
                <CategoryAndOrder integrationMode noCategory={false} />
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </div>
            <Footer />
        </div>
    )
}

export default ShotsLayout