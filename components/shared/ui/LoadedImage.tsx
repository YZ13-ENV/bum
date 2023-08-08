import Image from 'next/image'
import React from 'react'

type Props = {
    link: string
    unOptimized?: boolean
}
const LoadedImage = ({ link, unOptimized=false }: Props) => {
    return (
        <Image placeholder="blur" unoptimized={unOptimized} blurDataURL={link} loading="lazy" fill
        src={link} className='!h-fit !relative object-contain rounded-xl' alt='block-image' />
    )
}

export default LoadedImage