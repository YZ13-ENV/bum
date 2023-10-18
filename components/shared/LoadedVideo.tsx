'use client'
import { ElementRef, useLayoutEffect, useRef } from "react"
import { useInView } from "framer-motion"
import Ambient from "../widgets/AmbientLight/Ambient"

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
    if (withAmbiLight) return <Ambient link={link} />
    return (
        <video src={link} ref={videoBlock} loop placeholder="blur" autoPlay={autoPlay} controls={false} muted className='object-cover w-full h-full rounded-xl' />
    )
}

export default LoadedVideo