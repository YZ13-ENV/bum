import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import { ImageBlock } from '@/types'
import React from 'react'

type Props = {
    block: ImageBlock
}
const ImageBlock = ({ block }: Props) => {
    return (
        <div className="w-full h-[32rem] shrink-0">
            <BlockImage imageLink={block.link} />
        </div>
    )
}

export default ImageBlock