const ServerBlockImage = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/ServerBlockImage')) 
const ServerBlockVideo = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/ServerBlockVideo')) 
import dynamic from 'next/dynamic'
import { memo } from 'react'

type Props = {
    type: 'image' | 'video'
    link: string
    server?: boolean
    quality?: number
    object?: 'cover' | 'contain' 
    autoPlay?: boolean
}
const MediaBlock = ({ type, link, server=false, quality=75, object='contain', autoPlay=false }: Props) => {
    if (process.env.NODE_ENV === 'development') return <ServerBlockImage block={{ link: '/original-error.png', type: 'image' }} object={object} quality={quality} />
    if (link !== '') {
        if (type === "image") {
            return <ServerBlockImage block={{ link: link, type: type }} object={object} quality={quality} />
        } else return <ServerBlockVideo block={{ link: link, type: type }} autoPlay={autoPlay} />
    }
    return null
}

export default memo(MediaBlock)