'use client'
import { LoadedImageProps } from '@/components/shared/LoadedImage';
import Image from 'next/image';
import { ElementRef, memo, useLayoutEffect, useRef, useState } from 'react'
import { FastAverageColor } from 'fast-average-color';
import { useSpring, animated, easings } from '@react-spring/web';

const ImageAmbientLight = ({ link, object, quality }: Omit<LoadedImageProps, 'withAmbiLight'>) => {
    const ImageBlock = useRef<ElementRef<'img'>>(null);
    const fac = new FastAverageColor()
    const canvas = useRef<ElementRef<'canvas'>>(null);
    const [hex, setHex] = useState<string>("")
    function repaintAmbientLight() {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");
            if (context && ImageBlock.current) {
                context.drawImage(ImageBlock.current, 0, 0, canvas.current.width, canvas.current.height);
            }
        }
    }
    const springs = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: .55
        },
        config: {
            duration: 3000,
            easing: easings.easeInOutSine
        }
    })
    useLayoutEffect(() => {
        if (ImageBlock.current) {
            fac.getColorAsync(ImageBlock.current)
            .then(res => {
                setHex(res.hex)
            })
            repaintAmbientLight()
            ImageBlock.current.addEventListener("load", () => repaintAmbientLight());
        }
    },[ImageBlock.current])
    useLayoutEffect(() => {
        if (ImageBlock.current) {
            ImageBlock.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    },[])
    return (
        <div style={hex !== '' ? { backgroundColor: hex } : {}} 
        className={`relative w-full ${object === 'contain' ? 'h-fit' : 'h-full aspect-[4/3]'} z-10 flex overflow-visible items-center justify-center shrink-0 rounded-xl`}>
            <animated.canvas ref={canvas} style={springs}
            id="ambiLightv2" className={object === 'contain' ? 'h-full' : 'h-full aspect-[4/3]'} onLoad={() => repaintAmbientLight()} />
            <Image ref={ImageBlock} priority fill src={link} unoptimized={link.includes('.gif') ? true : false}
            className={`!relative w-full ${object === 'contain' ? '!object-contain !h-fit' : '!h-full object-cover aspect-[4/3]'} rounded-xl`} 
            alt='block-image' quality={quality} />
        </div>
    )
}

export default memo(ImageAmbientLight)