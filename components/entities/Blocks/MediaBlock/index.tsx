const BlockImage = dynamic(() => import('@/components/widgets/Blocks/BlockImage'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 
const BlockVideo = dynamic(() => import('@/components/widgets/Blocks/BlockVideo'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 
const ServerBlockImage = dynamic(() => import('@/components/widgets/Blocks/ServerBlockImage'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 
import dynamic from 'next/dynamic'
import React from 'react'

type Props = {
    type: 'image' | 'video'
    link: string
    server?: boolean
}
const MediaBlock = ({ type, link, server=false }: Props) => {
    if (link !== '') {
        if (type === "image") {
            return server ? <ServerBlockImage link={link} /> : <BlockImage imageLink={link} />
        } else return <BlockVideo block={{ link: link, type: type }} />
    }
    return null
}

export default MediaBlock