import PreviewShotPage from '@/components/pages/PreviewShotPage'
import { redirect } from 'next/navigation'
import React from 'react'

const DevPage = () => {
    if (process.env.NODE_ENV !== 'development') return redirect('/')
    return (
        <div className='flex items-center justify-center w-full h-scree'>
            <div className='fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-screen bg-black bg-opacity-50'>
                <section className='flex flex-col w-full h-[80vh] max-w-5xl p-8 mx-auto overflow-x-hidden overflow-y-auto bg-black border border-neutral-900 rounded-xl'>
                    {/* <PreviewShotPage /> */}
                </section>
            </div>
        </div>
    )
}

export default DevPage