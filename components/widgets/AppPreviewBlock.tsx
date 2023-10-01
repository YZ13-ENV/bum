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
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    useLayoutEffect(() => {
        console.log(inViewPort, ratio)
    },[inViewPort, ratio])
    return (
        <div  className="relative max-w-7xl p-1 group w-full md:mt-12 mt-6 h-fit overflow-hidden rounded-xl border border-transparent">
            <div className="absolute right-0 top-0 w-full h-full bg-neutral-800"></div>
            <div ref={ref} 
            className="absolute left-0 cursor-pointer flex flex-col items-center justify-center top-0 z-10 w-full h-full bg-gradient-to-t from-black to-transparent">
                <h2 className='text-4xl group-hover:opacity-100 opacity-0 transition-opacity duration-500 font-semibold text-center text-neutral-300'>Вдохновляйтесь.Делитесь.Оценивайте</h2>
            </div>
            <Image src={isTabletOrMobile ? '/bum_preview_mobile.png' : '/bum_preview.png'} 
            className={`!relative group-hover:brightness-50 transition-all duration-500 rounded-xl`} fill alt='app-preview' />
        </div>
    )
}

export default AppPreviewBlock