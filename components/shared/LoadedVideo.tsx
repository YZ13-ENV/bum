'use client'
import { ElementRef, useLayoutEffect, useRef } from "react"
import { useInViewport } from "ahooks"
import VideoAmbientLight from "../widgets/AmbientLight/VideoAmbientLight"

export type LoadedVideoProps = {
    withAmbiLight?: boolean
    link: string
    autoPlay?: boolean
}
const LoadedVideo = ({ withAmbiLight=false, link, autoPlay=false }: LoadedVideoProps) => {
    const videoBlock = useRef<ElementRef<'video'>>(null)
    const [inViewport] = useInViewport(videoBlock);
    useLayoutEffect(() => {
        if (videoBlock.current) {}
    },[videoBlock, inViewport])
    if (withAmbiLight) return <VideoAmbientLight link={link} autoPlay={autoPlay} />
    return (
        <video src={link} ref={videoBlock} loop autoPlay={autoPlay} controls={false} muted className='object-cover w-full h-full rounded-xl' />
    )
}

export default LoadedVideo