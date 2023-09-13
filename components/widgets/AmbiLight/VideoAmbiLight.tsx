'use client'
import { LoadedVideoProps } from '@/components/shared/LoadedVideo'
import { useInterval } from 'ahooks';
import { ElementRef, useLayoutEffect, useRef, useState } from 'react'

const VideoAmbiLight = ({ link, autoPlay }: Omit<LoadedVideoProps, 'withAmbiLight'>) => {
    const videoBlock = useRef<ElementRef<'video'>>(null);
    const canvas = useRef<ElementRef<'canvas'>>(null);
    const [ambientIsRun, setAmbientRun] = useState<boolean>(false)
    const [run, setRun] = useState<boolean>(false);
    const FRAMERATE = 30;
    function repaintAmbilight() {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");
            if (context && videoBlock.current) {
                context.drawImage(videoBlock.current, 0, 0, videoBlock.current.videoWidth, videoBlock.current.videoHeight);
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
        if (videoBlock.current) {
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
    },[videoBlock.current, ambientIsRun])
    return (
        <>
            <canvas ref={canvas} id="ambiLight" onLoad={() => repaintAmbilight()} />
            <video ref={videoBlock} src={link} muted className='object-cover w-full h-full rounded-xl' loop autoPlay={autoPlay} controls={false} />
        </>
    )
}

export default VideoAmbiLight