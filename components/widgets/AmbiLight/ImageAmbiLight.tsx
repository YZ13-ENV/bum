'use client'
import { LoadedImageProps } from '@/components/shared/LoadedImage';
import Image from 'next/image';
import { ElementRef, useLayoutEffect, useRef, useState } from 'react'
import { FastAverageColor } from 'fast-average-color';

const ImageAmbiLight = ({ link, object, quality }: Omit<LoadedImageProps, 'withAmbiLight'>) => {
    const ImageBlock = useRef<ElementRef<'img'>>(null);
    const fac = new FastAverageColor()
    const canvas = useRef<ElementRef<'canvas'>>(null);
    const [hex, setHex] = useState<string>("")
    function repaintAmbilight() {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");
            if (context && ImageBlock.current) {
                context.drawImage(ImageBlock.current, 0, 0, ImageBlock.current.width, ImageBlock.current.height);
            }
        }
    }
    useLayoutEffect(() => {
        if (ImageBlock.current) {
            fac.getColorAsync(ImageBlock.current)
            .then(res => {
                setHex(res.hex)
            })
            repaintAmbilight()
            ImageBlock.current.addEventListener("load", () => repaintAmbilight());
        }
    },[ImageBlock.current])
    useLayoutEffect(() => {
        if (ImageBlock.current) {
            ImageBlock.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    },[])
    return (
        <div style={hex !== '' ? { backgroundColor: hex } : {}} 
        className={`relative w-full ${object === 'contain' ? 'h-fit' : 'h-full'} aspect-[4/3] shrink-0 rounded-xl`}>
            <canvas ref={canvas} id="ambiLight" />
            <Image ref={ImageBlock} priority fill src={link} unoptimized={link.includes('.gif') ? true : false}
            className={`!relative ${object === 'contain' ? 'object-contain !h-fit' : '!h-full object-cover'} aspect-[4/3] rounded-xl`} 
            alt='block-image' quality={quality} />
        </div>
    )
}

export default ImageAmbiLight