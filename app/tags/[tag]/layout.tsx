import CategoryAndOrder from '@/components/widgets/CategoryAndOrder'
import React, { Suspense } from 'react'
import Loading from './loading'
import Footer from '@/components/shared/Footer'

type Props = {
    params: {
        order: string
        tag: string
    }
    children: string
}
const ShotByTagLayout = ({ params, children }: Props) => {
    return (
        <div className='flex flex-col w-full h-full gap-4'>
            <div className="flex items-center justify-center w-full h-fit">
                <h1 className='text-4xl font-bold text-center capitalize text-neutral-300'>{params.tag}</h1>
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

export default ShotByTagLayout