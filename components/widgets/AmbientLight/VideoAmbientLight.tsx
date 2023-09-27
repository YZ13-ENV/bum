'use client'
import { LoadedVideoProps } from '@/components/shared/LoadedVideo'
import { useInterval } from 'ahooks';
import { ElementRef, useLayoutEffect, useRef, useState } from 'react'

const VideoAmbientLight = ({ link, autoPlay }: Omit<LoadedVideoProps, 'withAmbiLight'>) => {
    const videoBlock = useRef<ElementRef<'video'>>(null);
    const canvas = useRef<ElementRef<'canvas'>>(null);
    const [ambientIsRun, setAmbientRun] = useState<boolean>(false)
    const [run, setRun] = useState<boolean>(false);
    const FRAMERATE = 30;
    function repaintAmbientLight() {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");
            if (context && videoBlock.current) {
                context.drawImage(videoBlock.current, 0, 0, canvas.current.width, canvas.current.height);
            }
        }
    }
    function startAmbientLightRepaint() {
        if (videoBlock.current && canvas.current) {
            setRun(true)
            setAmbientRun(true)
        }
    }
    const stopAmbientLightRepaint = useInterval(() => {
        repaintAmbientLight()
      }, run ? 1000 / FRAMERATE : undefined);
    useLayoutEffect(() => {
        if (!ambientIsRun && run) {
            startAmbientLightRepaint()
        }
    },[ambientIsRun, run])
    useLayoutEffect(() => {
        if (videoBlock.current) {
            videoBlock.current.play()
            videoBlock.current.addEventListener("play", () => startAmbientLightRepaint());
            videoBlock.current.addEventListener("pause", () => {
                stopAmbientLightRepaint()
                setAmbientRun(false)
            });
            videoBlock.current.addEventListener("ended", () => {
                stopAmbientLightRepaint()
                setAmbientRun(false)
            });
            videoBlock.current.addEventListener("seeked", () => repaintAmbientLight());
            videoBlock.current.addEventListener("load", () => repaintAmbientLight());
        }

    },[videoBlock.current, ambientIsRun])
    useLayoutEffect(() => {
        if (videoBlock.current) {
            videoBlock.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    },[])
    return (
        <div className='relative flex items-center justify-center'>
            <canvas ref={canvas} id="ambiLightv2" onLoad={repaintAmbientLight} />
            <video ref={videoBlock} src={link} muted
            className='object-cover w-full h-full aspect-[4/3] rounded-xl' loop autoPlay={autoPlay} controls={false} />
        </div>
    )
}

export default VideoAmbientLight