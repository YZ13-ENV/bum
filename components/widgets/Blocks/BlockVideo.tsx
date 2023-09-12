'use client'
import React from 'react'
import { animated, useSpring } from '@react-spring/web'
import { VideoBlock } from '@/types'
import LoadedVideo from '@/components/shared/ui/LoadedVideo'
import { getStorageHost } from '@/helpers/getHost'
import { fetchFile } from '@/helpers/fetchFile'
type Props = {
    block: VideoBlock
    autoPlay?: boolean
}
const BlockVideo = ({ block, autoPlay }: Props) => {
    const [loading, setLoading] = React.useState(false)
    const [link, setLink] = React.useState<string | null>(null)
    const spring = useSpring({
        from: {
            opacity: 0,
            scale: .75
        },
        to: {
            opacity: 1,
            scale: 1
        }
    })
    const getLink = async() => {
        setLoading(true)
        const url = await fetchFile(block.link)
        setLink(url)
        setLoading(false)
    }
    React.useLayoutEffect(() => {
        if (block.link !== '' && !link) {
            getLink()
        }
    },[])
    if (!link || loading) return (
        <animated.div style={{...spring}} className="relative w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
    )
    return (
        <div className="relative w-full h-full rounded-xl">
            <LoadedVideo link={link} autoPlay={autoPlay} />
        </div>
    )
}

export default BlockVideo