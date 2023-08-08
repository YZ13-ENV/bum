import BlockImage from '@/components/widgets/Blocks/BlockImage'
import BlockVideo from '@/components/widgets/Blocks/BlockVideo'
import React from 'react'

type Props = {
    type: 'image' | 'video'
    link: string
}
const MediaBlock = ({ type, link }: Props) => {
    if (link !== '') {
        if (type === "image") {
            return <BlockImage imageLink={link} />
        } else return <BlockVideo block={{ link: link, type: type }} />
    }
    return null
}

export default MediaBlock