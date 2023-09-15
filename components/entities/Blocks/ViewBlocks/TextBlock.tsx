'use client'
import { TextBlock } from '@/types'
import { fontSize } from '@/utils/fontSize'
import TextLine from './TextLine'
import { useAppSelector } from '../../store/store'
import { usePathname } from 'next/navigation'

type Props = {
    block: TextBlock
    enableMdSyntax?: boolean
}
const TextBlock = ({ block, enableMdSyntax=false }: Props) => {
    const enableSyntax = useAppSelector(state => state.uploader.modals.enableMDSyntax)
    const pathname = usePathname()
    const isBold = block.isBold ? 'font-bold' : ''
    const isItalic = block.isItalic ? 'italic' : ''
    const align = block.align === 'left' ? 'text-start' : block.align === 'center' ? 'text-center' : 'text-end'
    const size = fontSize[block.size]
    const lines = block.text.split("\n")
    if (!enableMdSyntax || pathname === '/uploads/shot' && !enableSyntax) {
        if (isBold) {
            return (
                <div className="flex flex-col w-full max-w-2xl mx-auto h-fit">
                    {
                        lines.map((line, index) => <span key={line + index} className={`${isBold} ${isItalic} ${align} ${size} min-h-[24px] text-neutral-200`}>{line}</span>)
                    }
                </div>
            )
        }
        return (
            <div className="flex flex-col w-full max-w-2xl mx-auto h-fit">
                {
                    lines.map((line, index) => <span key={line + index} className={`${isBold} ${isItalic} ${align} ${size} min-h-[24px] text-neutral-200`}>{line}</span>)
                }
            </div>
        )
    }
    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto h-fit">
            {
                lines.map((line, index) => <TextLine align={align} line={line} key={line + index} />)
            }
        </div>
    )
}

export default TextBlock