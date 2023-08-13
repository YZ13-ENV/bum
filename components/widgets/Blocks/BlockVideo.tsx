'use client'
import React from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/utils/app'
import { animated, useSpring } from '@react-spring/web'
import { VideoBlock } from '@/types'
import LoadedVideo from '@/components/shared/ui/LoadedVideo'
import { getHost } from '@/helpers/getHost'
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
        const urlRes = await fetch(`${getHost()}/images/file?link=${block.link.substring(1)}`, {
            cache: 'no-cache',
        })
        const url = await urlRes.json() 
        setLink(url)
        setLoading(false)
    }
    React.useLayoutEffect(() => {
        if (block.link !== '' && !link) {
            getLink()
        }
    },[])
    if (!link || loading) return (
        <animated.div style={{...spring}} className="relative w-full h-[32rem] rounded-xl bg-neutral-800 animate-pulse"/>
    )
    return (
        <div className="relative w-full h-full border rounded-xl border-neutral-700">
            <LoadedVideo link={link} autoPlay={autoPlay} />
        </div>
    )
}

export default BlockVideo