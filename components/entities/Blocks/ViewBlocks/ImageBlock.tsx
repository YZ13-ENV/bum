import BlockImage from '@/components/widgets/Blocks/BlockImage'
import { ImageBlock } from '@/types'
import React from 'react'

type Props = {
    block: ImageBlock
}
const ImageBlock = ({ block }: Props) => {
    return (
        <div className="w-full h-fit shrink-0">
            <BlockImage imageLink={block.link} />
        </div>
    )
}

export default ImageBlock