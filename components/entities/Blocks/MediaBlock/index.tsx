import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import BlockVideo from '@/components/widgets/UploadBlockView/ui/BlockVideo'
import React from 'react'

type Props = {
    type: 'image' | 'video'
    link: string
}
const MediaBlock = ({ type, link }: Props) => {
    if (type === "image") {
        return <BlockImage imageLink={link} />
    }
    if (type === "video") {
        <BlockVideo block={{ link: link, type: type }} />
    }
    return null
}

export default MediaBlock