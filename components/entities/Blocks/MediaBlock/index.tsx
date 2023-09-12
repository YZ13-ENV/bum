const ServerBlockImage = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/ServerBlockImage')) 
const ServerBlockVideo = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/ServerBlockVideo')) 
import dynamic from 'next/dynamic'
import { memo } from 'react'

type MediaBlockProps = {
    type: 'image' | 'video'
    link: string
    quality?: number
    object?: 'cover' | 'contain' 
    autoPlay?: boolean
    withAmbiLight?: boolean

}
const MediaBlock = ({ withAmbiLight=false, type, link, quality=75, object='contain', autoPlay=false }: MediaBlockProps) => {
    if (process.env.NODE_ENV === 'development') return <ServerBlockImage block={{ link: '/original-error.png', type: 'image' }} object={object} quality={quality} />
    if (link !== '') {
        if (type === "image") {
            return <ServerBlockImage withAmbiLight={withAmbiLight} block={{ link: link, type: type }} object={object} quality={quality} />
        } else return <ServerBlockVideo withAmbiLight={withAmbiLight} block={{ link: link, type: type }} autoPlay={autoPlay} />
    }
    return null
}

export default memo(MediaBlock)