'use client'
import { LoadedVideoProps } from '@/components/shared/LoadedVideo'
import { useInterval } from 'ahooks';
import { useInViewport } from 'ahooks';
import { ElementRef, useLayoutEffect, useRef, useState } from 'react'

const VideoAmbiLight = ({ link, autoPlay }: Omit<LoadedVideoProps, 'withAmbiLight'>) => {
    const videoBlock = useRef<ElementRef<'video'>>(null);
    const [inViewport] = useInViewport(videoBlock);
    const canvas = useRef<ElementRef<'canvas'>>(null);
    const [ambientIsRun, setAmbientRun] = useState<boolean>(false)
    const [run, setRun] = useState<boolean>(false);
    const FRAMERATE = 30;
    function repaintAmbilight() {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");
            if (context && videoBlock.current) {
                context.drawImage(videoBlock.current, 0, 0, canvas.current.width, canvas.current.height);
            }
        }
    }
    function startAmbilightRepaint() {
        if (videoBlock.current && canvas.current) {
            setRun(true)
            setAmbientRun(true)
        }
    }
    const stopAmbilightRepaint = useInterval(() => {
        repaintAmbilight()
      }, run ? 1000 / FRAMERATE : undefined);
    useLayoutEffect(() => {
        if (!ambientIsRun && run) {
            startAmbilightRepaint()
        }
    },[ambientIsRun, run])
    useLayoutEffect(() => {
        if (videoBlock.current && inViewport) {
            videoBlock.current.play()
            videoBlock.current.addEventListener("play", () => startAmbilightRepaint());
            videoBlock.current.addEventListener("pause", () => {
                stopAmbilightRepaint()
                setAmbientRun(false)
            });
            videoBlock.current.addEventListener("ended", () => {
                stopAmbilightRepaint()
                setAmbientRun(false)
            });
            videoBlock.current.addEventListener("seeked", () => repaintAmbilight());
            videoBlock.current.addEventListener("load", () => repaintAmbilight());
        }
    },[videoBlock.current, ambientIsRun, inViewport])
    useLayoutEffect(() => {
        if (videoBlock.current) {
            videoBlock.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    },[])
    return (
        <div className='relative'>
            <canvas ref={canvas} id="ambiLight" onLoad={() => repaintAmbilight()} />
            {/* { videoBlock.current && <Progress percent={videoBlock.current.currentTime / videoBlock.current.duration * 100} showInfo={false} /> } */}
            <video ref={videoBlock} src={link} muted
            className='object-cover w-full h-full aspect-[4/3] rounded-xl' loop autoPlay={autoPlay} controls={false} />
        </div>
    )
}

export default VideoAmbiLight