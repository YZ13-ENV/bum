'use client'
import { LoadedVideoProps } from '@/components/shared/LoadedVideo'
import { useInterval } from 'ahooks';
import { ElementRef, memo, useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react'
import { useSpring, animated, easings } from '@react-spring/web';

const VideoAmbientLight = ({ link, autoPlay }: Omit<LoadedVideoProps, 'withAmbiLight'>) => {
    const videoBlock = useRef<ElementRef<'video'>>(null);
    const canvas = useRef<ElementRef<'canvas'>>(null);
    const [run, setRun] = useState<boolean>(false);
    const FRAMERATE = 30;
    const springs = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        },
        config: {
            duration: 1500,
            easing: easings.easeInOutCirc
        }
    })
    const repaintAmbientLight = useCallback(() => {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");
            if (context && videoBlock.current) {
                context.drawImage(videoBlock.current, 0, 0, canvas.current.width, canvas.current.height);
            }
        }
    }, [canvas, videoBlock]);

    const startAmbientLightRepaint = useCallback(() => {
        if (videoBlock.current && canvas.current) {
            setRun(true)
        }
    }, [videoBlock, canvas]);

    const stopAmbientLightRepaint = useInterval(() => {
        repaintAmbientLight()
    }, run ? 1000 / FRAMERATE : undefined);
    useEffect(() => {
        const video = videoBlock.current;
        if (video) {
            if (run) {
                video.play()
            } else video.pause()
        }
    },[run, videoBlock.current])
    useEffect(() => {
        const video = videoBlock.current;
        if (video) {
            const handlePlay = () => startAmbientLightRepaint();
            const handlePause = () => {
                stopAmbientLightRepaint();
                setRun(false);
            };
            const handleEnded = handlePause;
            const handleSeeked = () => repaintAmbientLight();
            const handleLoad = handleSeeked;

            video.addEventListener('loadeddata', () => {
                video.play();
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
        }
    }, [videoBlock, startAmbientLightRepaint, stopAmbientLightRepaint, repaintAmbientLight]);

    useLayoutEffect(() => {
        if (videoBlock.current) {
            videoBlock.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    },[])

    return (
        <div className='relative z-10 flex items-center justify-center'>
            <animated.canvas style={springs} ref={canvas} id="ambiLightv2" className='aspect-[4/3]' onLoad={() => repaintAmbientLight()} />
            <video ref={videoBlock} src={link} muted
            className='object-cover w-full h-full aspect-[4/3] rounded-xl' loop autoPlay={autoPlay} controls={false} />
        </div>
    )
}

export default memo(VideoAmbientLight)