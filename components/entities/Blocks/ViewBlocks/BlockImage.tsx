'use client'
import { memo, useState, useEffect } from 'react'
import { animated, useSpring } from '@react-spring/web'
import LoadedImage from '@/components/shared/LoadedImage'
import { fetchFile } from '@/helpers/fetchFile'

type Props = {
    imageLink: string
    object?: 'cover' | 'contain' 
    quality?: number
}
const BlockImage = ({ imageLink, object='contain', quality=100 }: Props) => {
    const [loading, setLoading] = useState(false)
    const [link, setLink] = useState<string | null>(null)
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
    useEffect(() => {
        if (imageLink !== '' && !link) {
            getLink()
        }
    },[])
    if (!link || loading) return (
        <animated.div style={{...spring}} className="relative w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
    )
    return (
        <div className={`relative w-full ${object === 'contain' ? 'h-fit' : 'h-full'} rounded-xl`}>
            <LoadedImage link={link} object={object} quality={quality} />
        </div>
    )
}

export default memo(BlockImage)