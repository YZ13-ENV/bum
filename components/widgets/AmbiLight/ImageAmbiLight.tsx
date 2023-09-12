'use client'
import { LoadedImageProps } from '@/components/shared/LoadedImage';
import Image from 'next/image';
import { ElementRef, useLayoutEffect, useRef, useState } from 'react'

const ImageAmbiLight = ({ link, object, quality }: Omit<LoadedImageProps, 'withAmbiLight'>) => {
    const ImageBlock = useRef<ElementRef<'img'>>(null);
    const canvas = useRef<ElementRef<'canvas'>>(null);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
    const FRAMERATE = 30;
    function repaintAmbilight() {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");
            if (context && ImageBlock.current) {
                context.drawImage(ImageBlock.current, 0, 0, ImageBlock.current.width, ImageBlock.current.height);
            }
        }
    }
    
    function startAmbilightRepaint() {
        if (ImageBlock.current && canvas.current) {
            const id = setInterval(() => repaintAmbilight(), 1000 / FRAMERATE)
            setIntervalId(id);
        }
    }
    
    function stopAmbilightRepaint() {
        clearInterval(intervalId);
    }
    useLayoutEffect(() => {
        if (ImageBlock.current) {
            repaintAmbilight()
            ImageBlock.current.addEventListener("load", () => repaintAmbilight());
        }
    },[ImageBlock.current])
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