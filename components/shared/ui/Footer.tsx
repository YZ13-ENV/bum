'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {
    const path = usePathname()
    if (path === '/auth' || path === '/uploads/shot') return null
    return (
        <div className="flex items-center justify-between w-full p-4 mt-10 border-t md:px-12 md:py-4 h-fit shrink-0 border-neutral-700">
            <div className="flex items-center gap-2 w-fit h-fit">
                <Image src='/Dey.svg' width={24} height={24} alt='root-logo' />
                <span className='font-bold text-neutral-200'>Dey</span>
            </div>
            <span className='text-neutral-400'>2023</span>
        </div>
    )
}

export default Footer