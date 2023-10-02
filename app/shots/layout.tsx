import Footer from '@/components/shared/Footer'
import Categories from '@/components/widgets/Categories'
import Tabs from '@/components/widgets/Tabs'
import React from 'react'

type Props = {
    children: React.ReactNode
}
const ShotsLayout = ({ children }: Props) => {
    return (
        <div className='flex flex-col w-full h-full gap-4 shot_wrapper'>
            <div className='flex flex-col w-full h-full gap-6 px-4 md:px-12'>
                <div className="relative flex flex-row items-center justify-center w-full gap-2 overflow-x-hidden h-fit">
                    <div className="left-0 inline shrink-0 lg:absolute"><Tabs integrationMode prefix='/shots' /></div>
                    <Categories />
                </div>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default ShotsLayout