import BlockImage from '@/components/widgets/Blocks/BlockImage'
import BlockVideo from '@/components/widgets/Blocks/BlockVideo'
import ServerBlockImage from '@/components/widgets/Blocks/ServerBlockImage'
import ServerBlockVideo from '@/components/widgets/Blocks/ServerBlockVideo'
import React from 'react'

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
            return server ? <ServerBlockImage link={link} quality={quality} object={object} /> 
            : <BlockImage imageLink={link} quality={quality} object={object} />
        } else return server 
        ? <ServerBlockVideo block={{ link: link, type: type }} autoPlay={autoPlay} /> 
        : <BlockVideo block={{ link: link, type: type }} autoPlay={autoPlay} />
    }
    return null
}

export default MediaBlock