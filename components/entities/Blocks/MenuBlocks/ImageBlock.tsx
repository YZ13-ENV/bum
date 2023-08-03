import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import { ImageBlock } from '@/types'
import React from 'react'

type Props = {
    block: ImageBlock
}
const ImageBlock = ({ block }: Props) => {
    return (
        <div className="w-full h-56 border shrink-0 rounded-xl border-neutral-800 bg-neutral-950">
            {
                block.link !== '' && 
                <BlockImage imageLink={block.link} />
            }
        </div>
    )
}

export default ImageBlock