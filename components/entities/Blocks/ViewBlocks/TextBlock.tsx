import { TextBlock } from '@/types'
import { fontSize } from '@/utils/fontSize'
import React from 'react'

type Props = {
    block: TextBlock
}
const TextBlock = ({ block }: Props) => {
    const isBold = block.isBold ? 'font-bold' : ''
    const isItalic = block.isItalic ? 'italic' : ''
    const align = block.align === 'left' ? 'text-start' : block.align === 'center' ? 'text-center' : 'text-end'
    const size = fontSize[block.size]
    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto h-fit">
            <span className={`${isBold} ${isItalic} ${align} ${size}`}>{block.text}</span>
        </div>
    )
}

export default TextBlock