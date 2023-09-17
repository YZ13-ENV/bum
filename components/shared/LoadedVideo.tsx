'use client'
import { ElementRef, useLayoutEffect, useRef } from "react"
import VideoAmbiLight from "../widgets/AmbiLight/VideoAmbiLight"

export type LoadedVideoProps = {
    withAmbiLight?: boolean
    link: string
    autoPlay?: boolean
}
const LoadedVideo = ({ withAmbiLight=false, link, autoPlay=false }: LoadedVideoProps) => {
    const videoBlock = useRef<ElementRef<'video'>>(null)
    useLayoutEffect(() => {
        if (videoBlock.current) {
        }
    },[videoBlock])
    if (withAmbiLight) return <VideoAmbiLight link={link} autoPlay={autoPlay} />
    return (
        <video src={link} ref={videoBlock} loop autoPlay={autoPlay} controls={false}
        onMouseEnter={e => !autoPlay && videoBlock.current?.play()} onMouseLeave={() => {
            if (!autoPlay && videoBlock.current) {
                videoBlock.current?.pause()
                videoBlock.current.currentTime = 0
            }
        }}
        muted className='object-cover w-full h-full rounded-xl' />
    )
}

export default LoadedVideo