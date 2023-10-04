import Footer from '@/components/shared/Footer'
import React from 'react'
import Nav from './Nav'

type Props = {
    children: React.ReactNode
}
const TermsLayout = ({ children }: Props) => {
    return (
        <>
            <div className='flex flex-col w-full h-full gap-4 px-4'>
                <Nav />
                {children}
            </div>
            <Footer />
        </>
    )
}

export default TermsLayout