import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiX } from 'react-icons/bi'

const LogoSection = () => {
    return (
        <div className='flex items-center gap-4 w-fit h-fit shrink-0'>
            <Link href='/' className="flex items-center gap-1 shrink-0 w-fit h-fit">
                <Image src='/DarkMaterial.svg' className='shrink-0' width={32} height={32} alt="app-logo" />
                <BiX size={17} className='text-neutral-400' />
                <div className="flex items-center gap-2 py-1 pl-1 pr-3 border rounded-full border-neutral-700 w-fit h-fit bg-neutral-900">
                    <Image src='/Dey.svg' className='shrink-0' width={32} height={32} alt="app-logo" />
                    <span className='text-xl font-bold text-neutral-200'>Dey</span>
                </div>
            </Link>
        </div>
    )
}

export default LogoSection