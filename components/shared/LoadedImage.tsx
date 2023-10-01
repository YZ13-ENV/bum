'use client'
import Image from 'next/image'
import { FastAverageColor } from 'fast-average-color';
import { useRef, ElementRef, useState, useLayoutEffect } from 'react';
import ImageAmbientLight from '../widgets/AmbientLight/ImageAmbientLight';

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
            try {
                fac.getColorAsync(ImageBlock.current)
                .then(res => {
                    setHex(res.hex)
                })
            } catch(e) {
                setHex("")
            }
        }
    },[ImageBlock.current])
    if (withAmbiLight) return <ImageAmbientLight link={link} object={object} quality={quality} />
    return (
        <Image ref={ImageBlock} style={ object !== 'cover' || hex !== '' ? { backgroundColor: hex } :{}} priority fill src={link} unoptimized={link.includes('.gif') ? true : false}
        className={`!relative ${object === 'contain' ? 'object-contain w-full !h-fit' : 'h-full aspect-[4/3] object-cover'} rounded-xl`} 
        alt='block-image' quality={quality} />
    )
}

export default LoadedImage