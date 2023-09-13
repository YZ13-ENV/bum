'use client'
import { LoadedImageProps } from '@/components/shared/LoadedImage';
import Image from 'next/image';
import { ElementRef, useLayoutEffect, useRef } from 'react'

const ImageAmbiLight = ({ link, object, quality }: Omit<LoadedImageProps, 'withAmbiLight'>) => {
    const ImageBlock = useRef<ElementRef<'img'>>(null);
    const canvas = useRef<ElementRef<'canvas'>>(null);
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
        <>
            <canvas ref={canvas} id="ambiLight" />
            <Image ref={ImageBlock} priority fill src={link} unoptimized={link.includes('.gif') ? true : false}
            className={`!relative ${object === 'contain' ? 'object-contain !h-fit' : '!h-full object-cover'}  rounded-xl`} 
            alt='block-image' quality={quality} />
        </>
    )
}

export default ImageAmbiLight