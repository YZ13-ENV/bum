import Image from 'next/image'
import React from 'react'

type Props = {
    link: string
}
const LoadedImage = ({ link }: Props) => {
    return (
        <Image placeholder="blur" blurDataURL={link} loading="lazy" fill
        src={link} className='!h-fit !relative object-contain rounded-xl' alt='block-image' />
    )
}

export default LoadedImage