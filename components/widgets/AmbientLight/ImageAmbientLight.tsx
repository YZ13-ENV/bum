'use client'
import { LoadedImageProps } from '@/components/shared/LoadedImage';
import Image from 'next/image';
import { ElementRef, memo, useLayoutEffect, useRef, useState } from 'react'
import { FastAverageColor } from 'fast-average-color';
import { MotionConfig, motion } from 'framer-motion';

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
        className={`relative w-full ${object === 'contain' ? 'h-fit' : 'h-full aspect-[16/12]'} z-10 flex overflow-visible items-center justify-center shrink-0 rounded-xl`}>
            <div className={'absolute flex items-center justify-center light_wrapper aspect-[16/12] blur-[125px]'}>
                <MotionConfig transition={{ type: "spring", duration: 3000 }}>
                    <motion.canvas initial={{ opacity: 0 }} animate={{ opacity: .65 }} ref={canvas} id="ambiLightv2" className='aspect-[16/12]' onLoad={() => repaintAmbientLight()} />
                </MotionConfig>
            </div>
            <Image ref={ImageBlock} priority fill src={link} unoptimized={link.includes('.gif') ? true : false}
            className={`!relative w-full ${object === 'contain' ? '!object-contain !h-fit' : '!h-full object-cover aspect-[4/3]'} rounded-xl`} 
            alt='block-image' quality={quality} />
        </div>
    )
}

export default memo(ImageAmbientLight)