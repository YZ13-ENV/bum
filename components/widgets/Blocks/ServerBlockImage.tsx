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
}
const ServerBlockImage = async({ link }: Props) => {
    const url = await getUrl(link)
    return (
        <div className="relative w-full border h-fit rounded-xl border-neutral-700">
            <LoadedImage link={url} unOptimized={link.includes('.gif')} />
        </div>
    )
}

export default ServerBlockImage