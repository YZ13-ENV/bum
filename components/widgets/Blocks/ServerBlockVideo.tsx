const LoadedVideo = dynamic(() => import('@/components/shared/ui/LoadedVideo'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 
import { VideoBlock } from '@/types'
import { storage } from '@/utils/app'
import { getDownloadURL, ref } from 'firebase/storage'
import dynamic from 'next/dynamic'
import React from 'react'

type Props = {
    block: VideoBlock
}
const getUrl = async(link: string) => {
    const videoRef = ref(storage, link)
    const url = await getDownloadURL(videoRef) 
    return url
}
const ServerBlockVideo = async({ block }: Props) => {
    const url = await getUrl(block.link)
    return (
        <div className="relative w-full h-full border rounded-xl border-neutral-700">
            <LoadedVideo link={url} />
        </div>
    )
}

export default ServerBlockVideo