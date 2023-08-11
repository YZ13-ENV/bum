'use client'
import React from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/utils/app'
import { animated, useSpring } from '@react-spring/web'
import { VideoBlock } from '@/types'
import LoadedVideo from '@/components/shared/ui/LoadedVideo'
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
    React.useLayoutEffect(() => {
        if (block.link !== '' && !link) {
            setLoading(true)
            const imageRef = ref(storage, block.link)
            getDownloadURL(imageRef)
            .then(res => {
                setLink(res)
                setLoading(false)
            })
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