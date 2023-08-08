import Image from 'next/image'
import React from 'react'

type Props = {
    link: string
    quality?: number
    unOptimized?: boolean
    object?: 'cover' | 'contain' 
}
const LoadedImage = ({ link, quality=100, object='contain', unOptimized=false }: Props) => {
    return (
        <Image placeholder="blur" unoptimized={unOptimized} blurDataURL={link} loading="lazy" fill 
        src={link} className={` !relative ${object === 'contain' ? 'object-contain !h-fit' : '!h-full object-cover'}  rounded-xl`} alt='block-image' quality={quality} />
    )
}

export default LoadedImage