'use client'
import { useInViewport } from 'ahooks'
import Image from 'next/image'
import React, { ElementRef, useLayoutEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

const AppPreviewBlock = () => {
    const ref = useRef<ElementRef<'div'>>(null)
    const [inViewPort, ratio] = useInViewport(ref, {
        root: () => document.getElementById('promo-section')
    })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    useLayoutEffect(() => {
        console.log(inViewPort, ratio)
    },[inViewPort, ratio])
    return (
        <div  className="relative w-full max-w-md p-1 my-6 overflow-hidden border border-transparent md:max-w-4xl lg:max-w-7xl group md:my-12 h-fit rounded-xl">
            <div className="absolute top-0 right-0 w-full h-full bg-neutral-800"></div>
            <div ref={ref} 
            className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gradient-to-t from-black to-transparent">
                <h2 className='text-4xl font-semibold text-center transition-opacity duration-500 opacity-0 group-hover:opacity-100 text-neutral-300'>
                    Вдохновляйтесь. Делитесь. Оценивайте.
                </h2>
            </div>
            <Image src={isTabletOrMobile ? '/bum_preview_mobile.png' : '/bum_preview.png'} placeholder='blur' 
            blurDataURL={isTabletOrMobile ? '/bum_preview_mobile.png' : '/bum_preview.png'} priority
            className={`!relative group-hover:brightness-50 transition-all duration-500 rounded-xl`} fill alt='app-preview' />
        </div>
    )
}

export default AppPreviewBlock