import Footer from '@/components/shared/Footer'
import CategoryAndOrder from '@/components/widgets/CategoryAndOrder'
import React, { Suspense } from 'react'
import Loading from './loading'
import AppHeader from '@/components/widgets/AppHeader'


const ShotsLayout = (props: { children: React.ReactNode, modal: React.ReactNode }) => {
    return (
        <div className='flex flex-col w-full h-full gap-4'>
            <AppHeader />
            <div className='flex flex-col w-full h-full gap-6'>
                <div className="sticky top-0 z-40 w-full">
                    <div className="w-full max-w-6xl py-2 mx-auto bg-black rounded-md">
                        <CategoryAndOrder integrationMode noCategory={false} />
                    </div>
                </div>
                <div id='shots-wrapper' className='grid min-h-screen home_grid gap-9'>
                    <Suspense fallback={<Loading />}>
                        { props.children }
                        {/* { props.modal ? props.modal : null } */}
                    </Suspense>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ShotsLayout