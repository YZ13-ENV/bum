const LoadedVideo = dynamic(() => import('@/components/shared/ui/LoadedVideo'))
import { getHost } from '@/helpers/getHost'
import { VideoBlock } from '@/types'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

type Props = {
    block: VideoBlock
    autoPlay?: boolean
}
const getUrl = async(link: string) => {
    const stableLink = link.charAt(0) === '/' ? link.substring(1) : link
    const urlRes = await fetch(`${getHost()}/images/file?link=${stableLink}`, {
        cache: 'no-cache',
    })
    const url = await urlRes.json() 
    return url
}
const ServerBlockVideo = async({ block, autoPlay }: Props) => {
    const url = await getUrl(block.link)
    return (
        <div className="relative w-full h-full border rounded-xl border-neutral-700">
            <Suspense fallback={<div className='w-full h-full'/>}>
                <LoadedVideo link={url} autoPlay={autoPlay} />
            </Suspense>
        </div>
    )
}

export default ServerBlockVideo