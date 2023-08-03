'use client'
import React, { useEffect } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/utils/app'
import Image from 'next/image'

type Props = {
    imageLink: string
}
const BlockImage = ({ imageLink }: Props) => {
    const [link, setLink] = React.useState<string | null>(null)
    React.useEffect(() => {
        const imageRef = ref(storage, imageLink)
        getDownloadURL(imageRef)
        .then(res => setLink(res))
    },[])
    if (!link) return (
        <div className="relative w-full h-full rounded-xl bg-neutral-900 animate-pulse"/>
    )
    return (
        <div className="relative w-full h-full border rounded-xl border-neutral-700">
            <Image src={link} fill className='object-cover rounded-xl' alt='root-block-image' />
        </div>
    )
}

export default BlockImage