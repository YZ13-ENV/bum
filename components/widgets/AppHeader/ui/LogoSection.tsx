import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LogoSection = () => {
    return (
        <Link href='/' className="flex items-center gap-2 shrink-0 w-fit h-fit">
            <Image src='/Dey.svg' className='rounded-full shrink-0' width={36} height={36} alt="app-logo" />
            <span className='hidden text-2xl font-bold md:inline text-neutral-800 dark:text-neutral-200'>Dey</span>
        </Link>
    )
}

export default LogoSection