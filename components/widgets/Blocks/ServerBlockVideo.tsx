import LoadedVideo from '@/components/shared/ui/LoadedVideo'
import { VideoBlock } from '@/types'
import { storage } from '@/utils/app'
import { getDownloadURL, ref } from 'firebase/storage'
import React from 'react'

type Props = {
    block: VideoBlock
    autoPlay?: boolean
}
const getUrl = async(link: string) => {
    const videoRef = ref(storage, link)
    const url = await getDownloadURL(videoRef) 
    return url
}
const ServerBlockVideo = async({ block, autoPlay }: Props) => {
    const url = await getUrl(block.link)
    return (
        <div className="relative w-full h-full border rounded-xl border-neutral-700">
            <LoadedVideo link={url} autoPlay={autoPlay} />
        </div>
    )
}

export default ServerBlockVideo