import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className="flex w-full p-16 h-fit shrink-0 rounded-t-xl bg-neutral-800">
            <div className="flex flex-col w-full h-full max-w-sm gap-2">
                <div className="flex items-center w-full gap-2 h-fit">
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Image src='/DarkMaterial.svg' width={36} height={36} alt='root-logo' />
                        <span className='text-2xl font-bold text-neutral-200'>Dark Material</span>
                    </div>
                    <div className="w-0.5 h-full bg-neutral-700" />
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Image src='/Dey.svg' width={36} height={36} alt='root-logo' />
                        <span className='text-2xl font-bold text-neutral-200'>Dey</span>
                    </div>
                </div>
                <div className="w-full h-fit">
                    <span className='text-sm text-neutral-300'>Dey - приложение для объединения и вдохновения людей</span>
                </div>
            </div>
        </div>
    )
}

export default Footer