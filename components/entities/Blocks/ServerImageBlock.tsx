import { ImageBlock } from '@/types'
import { storage } from '@/utils/app'
import { getDownloadURL, ref } from 'firebase/storage'
import Image from 'next/image'
import React from 'react'

const getUrl = async(url: string) => {
    const fileRef = ref(storage, url)
    const dwnUrl = await getDownloadURL(fileRef)
    return dwnUrl
}
type Props = {
    block: ImageBlock
}
const ServerImageBlock = async({ block }: Props) => {
    const url = await getUrl(block.link)
    return (
        <div className="relative w-full h-full border rounded-xl border-neutral-700">
            <Image placeholder="blur" blurDataURL={url} loading="lazy"
            src={url} fill className='object-cover rounded-xl' alt='root-block-image' />
        </div>
    )
}

export default ServerImageBlock