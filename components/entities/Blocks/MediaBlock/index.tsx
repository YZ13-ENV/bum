// const BlockImage = dynamic(() => import('@/components/widgets/Blocks/BlockImage')) 
// const BlockVideo = dynamic(() => import('@/components/widgets/Blocks/BlockVideo')) 
const ServerBlockImage = dynamic(() => import('@/components/widgets/Blocks/ServerBlockImage')) 
const ServerBlockVideo = dynamic(() => import('@/components/widgets/Blocks/ServerBlockVideo')) 
import dynamic from 'next/dynamic'
import React, { memo } from 'react'

type Props = {
    type: 'image' | 'video'
    link: string
    server?: boolean
    quality?: number
    object?: 'cover' | 'contain' 
    autoPlay?: boolean
}
const MediaBlock = ({ type, link, server=false, quality=75, object='contain', autoPlay=false }: Props) => {
    if (link !== '') {
        if (type === "image") {
            return <ServerBlockImage block={{ link: link, type: type }} object={object} quality={quality} />
        } else return <ServerBlockVideo block={{ link: link, type: type }} autoPlay={autoPlay} />
    }
    return null
}

export default memo(MediaBlock)