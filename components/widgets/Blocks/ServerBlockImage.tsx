const LoadedImage = dynamic(() => import('@/components/shared/ui/LoadedImage'))
import { getStorageHost } from '@/helpers/getHost'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'


const getUrl = async(link: string) => {
    const stableLink = link.charAt(0) === '/' ? link.substring(1) : link
    const urlRes = await fetch(`${getStorageHost()}/files/file?link=${stableLink}`, {
        cache: 'no-cache',
    })
    const url = await urlRes.json() 
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
                <LoadedImage link={url} unOptimized={link.includes('.gif')} object={object} quality={quality} />
            </Suspense>
        </div>
    )
}

export default ServerBlockImage