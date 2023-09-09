import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LogoSection = () => {
    return (
        <div className='flex items-center gap-1 w-fit h-fit shrink-0'>
            <Link href='/' className="flex items-center gap-1 shrink-0 w-fit h-fit">
                <Image src='/Dey.svg' className='shrink-0' width={32} height={32} alt="app-logo" />
                <span className='text-xl font-bold text-neutral-200'>Dey</span>
            </Link>
        </div>
    )
}

export default LogoSection