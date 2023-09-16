'use client'
import Image from 'next/image'
import ImageAmbiLight from '../widgets/AmbiLight/ImageAmbiLight'
import { FastAverageColor } from 'fast-average-color';
import { useRef, ElementRef, useState, useLayoutEffect } from 'react';

export type LoadedImageProps = {
    withAmbiLight?: boolean
    link: string
    quality?: number
    object?: 'cover' | 'contain' 
}
const LoadedImage = ({ link, quality=75, object='contain', withAmbiLight }: LoadedImageProps) => {
    const ImageBlock = useRef<ElementRef<'img'>>(null);
    const fac = new FastAverageColor()
    const [hex, setHex] = useState<string>("")
    useLayoutEffect(() => {
        if (ImageBlock.current) {
            fac.getColorAsync(ImageBlock.current)
            .then(res => {
                setHex(res.hex)
            })
        }
    },[ImageBlock.current])
    if (withAmbiLight) return <ImageAmbiLight link={link} object={object} quality={quality} />
    return (
        <Image ref={ImageBlock} style={hex !== '' ? { backgroundColor: hex } :{}} priority fill src={link} unoptimized={link.includes('.gif') ? true : false}
        className={`!relative ${object === 'contain' ? 'object-contain !h-fit' : '!h-full object-cover'} aspect-[4/3] rounded-xl`} 
        alt='block-image' quality={quality} />
    )
}

export default LoadedImage