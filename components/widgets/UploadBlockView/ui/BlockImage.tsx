'use client'
import React, { memo } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/utils/app'
import { animated, useSpring } from '@react-spring/web'
import LoadedImage from '@/components/shared/ui/LoadedImage'

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
        <animated.div style={{...spring}} className="relative w-full h-[32rem] rounded-xl bg-neutral-800 animate-pulse"/>
    )
    return (
        <div className="relative w-full border h-fit rounded-xl border-neutral-700">
            <LoadedImage link={link} />
        </div>
    )
}

export default memo(BlockImage)