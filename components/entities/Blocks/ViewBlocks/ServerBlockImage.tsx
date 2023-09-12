const LoadedImage = dynamic(() => import('@/components/shared/LoadedImage'))
import { fetchFile } from '@/helpers/fetchFile'
import { ImageBlock } from '@/types'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'


// const getUrl = async(link: string) => {
//     const url = await fetchFile(link)
//     return url
// }
type Props = {
    withAmbiLight?: boolean
    block: ImageBlock
    quality?: number
    object?: 'cover' | 'contain' 
}
const ServerBlockImage = async({ block, withAmbiLight=false, object='contain', quality=75 }: Props) => {
    return (
        <div className={`relative w-full ${object === 'contain' ? 'h-fit' : 'h-full'} rounded-xl`}>
            <Suspense fallback={<div className='w-full h-full'/>}>
                <LoadedImage withAmbiLight={withAmbiLight} link={fetchFile(block.link)} object={object} quality={quality} />
            </Suspense>
        </div>
    )
}

export default ServerBlockImage