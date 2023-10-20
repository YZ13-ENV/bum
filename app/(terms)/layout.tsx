import Footer from '@/components/shared/Footer'
import React from 'react'
import Nav from './Nav'
import SimpleHeader from '@/components/widgets/SimpleHeader'

type Props = {
    children: React.ReactNode
}
const TermsLayout = ({ children }: Props) => {
    return (
        <>
            <div className='flex flex-col w-full max-w-5xl min-h-screen gap-4 p-4 mx-auto'>
                <SimpleHeader />
                <div className='flex flex-col w-full h-full gap-4'>
                    <Nav />
                    {children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TermsLayout