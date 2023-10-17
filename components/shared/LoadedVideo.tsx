'use client'
import { ElementRef, useLayoutEffect, useRef } from "react"
import VideoAmbientLight from "../widgets/AmbientLight/VideoAmbientLight"
import { useInView } from "framer-motion"

export type LoadedVideoProps = {
    withAmbiLight?: boolean
    link: string
    autoPlay?: boolean
}
const LoadedVideo = ({ withAmbiLight=false, link, autoPlay=false }: LoadedVideoProps) => {
    const videoBlock = useRef<ElementRef<'video'>>(null)
    const isInView = useInView(videoBlock)
    useLayoutEffect(() => {
        const video = videoBlock.current
        if (video && autoPlay) {
            if (isInView) {
                video.play()
            } else {
                video.pause()
            }
        }
    },[videoBlock, isInView, autoPlay])
    if (withAmbiLight) return <VideoAmbientLight link={link} autoPlay={autoPlay} />
    return (
        <video src={link} ref={videoBlock} loop placeholder="blur" autoPlay={autoPlay} controls={false} muted className='object-cover w-full h-full rounded-xl' />
    )
}

export default LoadedVideo