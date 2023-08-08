'use client'
import React from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/utils/app'
import { animated, useSpring } from '@react-spring/web'
import { VideoBlock } from '@/types'


type Props = {
    block: VideoBlock
}
const BlockVideo = ({ block }: Props) => {
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
    React.useEffect(() => {
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
            <video src={link} className='object-cover w-full h-full rounded-xl' loop autoPlay />
            {/* <source className='w-full h-full' src={link} type="video/mp4"/> */}
            {/* <Image placeholder="blur" blurDataURL={link} loading="lazy"
            src={link} fill className='object-cover rounded-xl' alt='root-block-image' /> */}
        </div>
    )
}

export default BlockVideo