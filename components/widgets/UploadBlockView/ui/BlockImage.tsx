'use client'
import React, { memo } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/utils/app'
import Image from 'next/image'
import { animated, useSpring, easings } from '@react-spring/web'

type Props = {
    imageLink: string
}
const BlockImage = ({ imageLink }: Props) => {
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
        if (imageLink !== '' && !link) {
            setLoading(true)
            const imageRef = ref(storage, imageLink)
            getDownloadURL(imageRef)
            .then(res => {
                setLink(res)
                setLoading(false)
            })
        }
    },[])
    if (!link || loading) return (
        <animated.div style={{...spring}} className="relative w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
    )
    return (
        <div className="relative w-full h-full border rounded-xl border-neutral-700">
            <Image placeholder="blur" blurDataURL={link} loading="lazy"
            src={link} fill className='object-cover rounded-xl' alt='root-block-image' />
        </div>
    )
}

export default memo(BlockImage)