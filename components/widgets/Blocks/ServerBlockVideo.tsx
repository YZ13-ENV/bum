const LoadedVideo = dynamic(() => import('@/components/shared/ui/LoadedVideo'))
import { fetchFile } from '@/helpers/fetchFile'
import { VideoBlock } from '@/types'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

type Props = {
    block: VideoBlock
    autoPlay?: boolean
}
const getUrl = async(link: string) => {
    const url = await fetchFile(link)
    return url
}
const ServerBlockVideo = async({ block, autoPlay }: Props) => {
    const url = await getUrl(block.link)
    return (
        <div className="relative w-full h-full rounded-xl">
            <Suspense fallback={<div className='w-full h-full'/>}>
                {
                    url
                    ? <LoadedVideo link={url} autoPlay={autoPlay} />
                    : <div className='w-full h-full rounded-xl bg-neutral-900' />
                }
            </Suspense>
        </div>
    )
}

export default ServerBlockVideo