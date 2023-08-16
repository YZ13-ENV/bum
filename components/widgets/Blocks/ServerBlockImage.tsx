const LoadedImage = dynamic(() => import('@/components/shared/ui/LoadedImage'))
import { fetchFile } from '@/helpers/fetchFile'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'


const getUrl = async(link: string) => {
    const url = await fetchFile(link)
    return url
}
type Props = {
    link: string
    quality?: number
    object?: 'cover' | 'contain' 

}
const ServerBlockImage = async({ link, object='contain', quality=75 }: Props) => {
    const url = await getUrl(link)
    return (
        <div className={`relative w-full ${object === 'contain' ? 'h-fit' : 'h-full'} rounded-xl`}>
            <Suspense fallback={<div className='w-full h-full'/>}>
                {
                    url
                    ? <LoadedImage link={url} unOptimized={link.includes('.gif')} object={object} quality={quality} />
                    : <div className='w-full h-full rounded-xl bg-neutral-900' />
                }
            </Suspense>
        </div>
    )
}

export default ServerBlockImage