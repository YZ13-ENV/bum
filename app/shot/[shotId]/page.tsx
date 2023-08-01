'use client'
import React from 'react'
import ImageLoader from '@/components/shared/ImageLoader'
import TextLoader from '@/components/shared/TextLoader'
type Props = {
    params: {
        shotId: string
    }
}
const ShotPage = ({ params }: Props) => {
    return (
        <div className='flex w-full h-full p-4 overflow-hidden'>
            <div className="w-full h-full"></div>
            <div className="flex flex-col w-full h-full max-w-6xl gap-4 shrink-0">
                <TextLoader width='50%' />
                <ImageLoader />
                <TextLoader width='75%' delay={500} />
                <TextLoader width='60%' delay={750} />
                <ImageLoader delay={900} />
            </div>
            <div className="w-full h-full"></div>
        </div>
    )
}

export default ShotPage