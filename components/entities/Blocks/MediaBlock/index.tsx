const BlockImage = dynamic(() => import('@/components/widgets/Blocks/BlockImage'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 
const BlockVideo = dynamic(() => import('@/components/widgets/Blocks/BlockVideo'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 
const ServerBlockImage = dynamic(() => import('@/components/widgets/Blocks/ServerBlockImage'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 
const ServerBlockVideo = dynamic(() => import('@/components/widgets/Blocks/ServerBlockVideo'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 
import dynamic from 'next/dynamic'
import React from 'react'

type Props = {
    type: 'image' | 'video'
    link: string
    server?: boolean
    quality?: number
    object?: 'cover' | 'contain' 
    autoPlay?: boolean
}
const MediaBlock = ({ type, link, server=false, quality, object='contain', autoPlay=false }: Props) => {
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