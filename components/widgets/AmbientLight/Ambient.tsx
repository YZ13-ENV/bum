'use client'
import { MotionConfig, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ElementRef, LegacyRef, MutableRefObject, memo, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useDebounceEffect, useInterval } from 'ahooks';

type Props = {
    link: string
}
const Ambient = ({ link }: Props) => {
    const isVideo = link.endsWith('.mp4')
    const mediaBlock = useRef<ElementRef<'video' | 'img'>>(null)
    const canvas = useRef<ElementRef<'canvas'>>(null);
    const isInView = useInView(mediaBlock)
    const [run, setRun] = useState<boolean>(true);
    
    const repaintAmbientLight = () => {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");
            if (context && mediaBlock.current) {
                context.imageSmoothingEnabled = true
                context.imageSmoothingQuality = 'low'
                    context.drawImage(mediaBlock.current, 0, 0, canvas.current.width, canvas.current.height);
            }
        }
    }
    const startAmbientLightRepaint = useCallback(() => {
        if (mediaBlock.current && canvas.current) {
            setRun(true)
        }
    }, [mediaBlock, canvas]);

    const stopAmbientLightRepaint = useInterval(() => {
        repaintAmbientLight()
    }, run ? 1000 / 10 : undefined);
    useDebounceEffect(() => {
        if (mediaBlock.current && isVideo) {
            const video = mediaBlock.current as HTMLVideoElement
            if (run) {
                video.play()
            } else {
                video.pause()
            }
        }
    },[run, mediaBlock], { wait: 750 })
    useDebounceEffect(() => {
        if (isInView) {
            setRun(true)
        } else {
            setRun(false)
        }
    },[isInView], { wait: 750 })

    useLayoutEffect(() => {
        const block = mediaBlock.current
        if (block) {
            if (isVideo) {
                const video = block as HTMLVideoElement
                const handlePlay = () => startAmbientLightRepaint();
                const handlePause = () => {
                    stopAmbientLightRepaint();
                    setRun(false);
                };
                const handleEnded = handlePause;
                const handleSeeked = () => repaintAmbientLight();
                const handleLoad = handleSeeked;
                setRun(true)
                handlePlay()
                video.addEventListener('loadeddata', () => {
                    setRun(true)
                });
                video.addEventListener("play", handlePlay);
                video.addEventListener("pause", handlePause);
                video.addEventListener("ended", handleEnded);
                video.addEventListener("seeked", handleSeeked);
                video.addEventListener("load", handleLoad);

                return () => {
                    video.removeEventListener("play", handlePlay);
                    video.removeEventListener("pause", handlePause);
                    video.removeEventListener("ended", handleEnded);
                    video.removeEventListener("seeked", handleSeeked);
                    video.removeEventListener("load", handleLoad);
                };
            } else {
                repaintAmbientLight()
                block.addEventListener("load", () => repaintAmbientLight());
            }
        }
    },[mediaBlock.current])
    useLayoutEffect(() => {
        if (mediaBlock.current) {
            mediaBlock.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    },[])
    return (
        <div className='relative w-full z-20 aspect-[4/3] flex items-center justify-center'>
            <div className={'absolute flex items-center justify-center light_wrapper aspect-[4/3] blur-[125px]'}>
                <MotionConfig transition={{ type: 'spring', duration: 400 }}>
                    <motion.canvas initial={{ opacity: .25 }} animate={{ opacity: .6 }} 
                    ref={canvas} className={`ambientLight aspect-[4/3] ${isVideo && 'animate-pulse duration-1000'} w-full`} onLoad={() => repaintAmbientLight()} />
                </MotionConfig>
            </div>
            {
                isVideo
                ? <video ref={mediaBlock as LegacyRef<HTMLVideoElement>} autoPlay muted loop className="z-10 object-cover w-full h-full rounded-2xl">
                    <source src={link} />
                </video>
                : <Image ref={mediaBlock as MutableRefObject<HTMLImageElement>} src={link} fill className="z-10 object-cover rounded-2xl" alt='img' />
            }
        </div>
    )
}

export default memo(Ambient)
