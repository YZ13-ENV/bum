import LoadedImage from '@/components/shared/ui/LoadedImage'
import { storage } from '@/utils/app'
import { getDownloadURL, ref } from 'firebase/storage'
import React from 'react'


const getUrl = async(link: string) => {
    const imageRef = ref(storage, link)
    const url = await getDownloadURL(imageRef) 
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
            <LoadedImage link={url} unOptimized={link.includes('.gif')} object={object} quality={quality} />
        </div>
    )
}

export default ServerBlockImage