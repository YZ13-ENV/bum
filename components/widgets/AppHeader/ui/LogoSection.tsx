import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LogoSection = () => {
    return (
        <div className="flex items-center gap-4 shrink-0 w-fit h-fit">
            <Link href='/' className='shrink-0'>
                <Image src='/DM_Design.svg' className='rounded-full' width={36} height={36} alt="app-logo" />
            </Link>
            <span className='hidden text-2xl font-bold md:inline text-neutral-200'>Design</span>
        </div>
    )
}

export default LogoSection