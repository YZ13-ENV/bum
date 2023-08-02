'use client'
import React, { useState } from 'react'
import TextLoader from '../shared/TextLoader'
import ImageLoader from '../shared/ImageLoader'
import { useTimeout } from 'ahooks'

const ShotPageLoader = () => {
    const [loading, setLoading] = useState(true)
    useTimeout(() => {
        setLoading(false)
    }, 3000)
    if (!loading) return null
    return (
        <div className='absolute top-0 left-0 flex w-full h-full p-4 overflow-hidden bg-black'>
            <div className="w-full h-full"></div>
            <div className="flex flex-col w-full h-full max-w-4xl gap-4 shrink-0">
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

export default ShotPageLoader