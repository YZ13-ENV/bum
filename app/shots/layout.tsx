import Tabs from '@/components/widgets/Tabs'
import React from 'react'

type Props = {
    children: React.ReactNode
}
const ShotsLayout = ({ children }: Props) => {
    return (
        <section className='flex flex-col w-full h-full px-4 md:px-12'>
            <Tabs prefix='/shots' />
            {children}
        </section>
    )
}

export default ShotsLayout