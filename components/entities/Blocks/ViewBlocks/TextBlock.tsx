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
    const lines = block.text.split("\n")
    if (isBold) {
        return (
            <div className="flex flex-col w-full max-w-2xl mx-auto h-fit">
                {
                    lines.map((line, index) => <span key={line + index} className={`${isBold} ${isItalic} ${align} ${size} text-neutral-200`}>{line}</span>)
                }
            </div>
        )
    }
    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto h-fit">
            {
                lines.map((line, index) => <span key={line + index} className={`${isBold} ${isItalic} ${align} ${size} text-neutral-400`}>{line}</span>)
            }
        </div>
    )
}

export default TextBlock