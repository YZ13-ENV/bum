import Footer from '@/components/shared/Footer'
import Tabs from '@/components/widgets/Tabs'
import React from 'react'

type Props = {
    children: React.ReactNode
}
const ShotsLayout = ({ children }: Props) => {
    return (
        <div className='flex flex-col w-full gap-4 h-fit'>
            <div className='flex flex-col w-full h-full px-4 md:px-12'>
                <Tabs prefix='/shots' />
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default ShotsLayout