const LoadedVideo = dynamic(() => import('@/components/shared/LoadedVideo'))
import { fetchFile } from '@/helpers/fetchFile'
import { VideoBlock } from '@/types'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

type Props = {
    block: VideoBlock
    autoPlay?: boolean
}
// const getUrl = async(link: string) => {
//     const url = await fetchFile(link)
//     return url
// }
const ServerBlockVideo = async({ block, autoPlay }: Props) => {
    return (
        <div className="relative w-full h-full rounded-xl">
            <Suspense fallback={<div className='w-full h-full'/>}>
                {
                    block.link
                    ? <LoadedVideo link={fetchFile(block.link)} autoPlay={autoPlay} />
                    : <div className='w-full h-full rounded-xl bg-neutral-900' />
                }
            </Suspense>
        </div>
    )
}

export default ServerBlockVideo