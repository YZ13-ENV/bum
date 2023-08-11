const BlockImage = dynamic(() => import('@/components/widgets/Blocks/BlockImage')) 
const BlockVideo = dynamic(() => import('@/components/widgets/Blocks/BlockVideo')) 
const ServerBlockImage = dynamic(() => import('@/components/widgets/Blocks/ServerBlockImage')) 
const ServerBlockVideo = dynamic(() => import('@/components/widgets/Blocks/ServerBlockVideo')) 
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

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
            return server ? <Suspense fallback={<div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse'/>}
            ><ServerBlockImage link={link} quality={quality} object={object} /> </Suspense>
            : <Suspense fallback={<div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse'/>}
            ><BlockImage imageLink={link} quality={quality} object={object} /></Suspense>
        } else return server 
        ? <Suspense fallback={<div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse'/>}
        ><ServerBlockVideo block={{ link: link, type: type }} autoPlay={autoPlay} /></Suspense>
        : <Suspense fallback={<div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse'/>}
        ><BlockVideo block={{ link: link, type: type }} autoPlay={autoPlay} /></Suspense>
    }
    return null
}

export default MediaBlock