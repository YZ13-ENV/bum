'use client'
import React, { memo } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/utils/app'
import { animated, useSpring } from '@react-spring/web'
import LoadedImage from '@/components/shared/ui/LoadedImage'
import { getStorageHost } from '@/helpers/getHost'
import { fetchFile } from '@/helpers/fetchFile'

type Props = {
    imageLink: string
    object?: 'cover' | 'contain' 
    quality?: number
}
const BlockImage = ({ imageLink, object='contain', quality=100 }: Props) => {
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
        const url = await fetchFile(imageLink)
        setLink(url)
        setLoading(false)
    }
    React.useEffect(() => {
        if (imageLink !== '' && !link) {
            getLink()
        }
    },[])
    if (!link || loading) return (
        <animated.div style={{...spring}} className="relative w-full h-[32rem] rounded-xl bg-neutral-800 animate-pulse"/>
    )
    return (
        <div className={`relative w-full ${object === 'contain' ? 'h-fit' : 'h-full'} rounded-xl`}>
            <LoadedImage link={link} unOptimized={imageLink.includes('.gif')} object={object} quality={quality} />
        </div>
    )
}

export default memo(BlockImage)