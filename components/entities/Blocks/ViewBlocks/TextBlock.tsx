'use client'
import { TextBlock } from '@/types'
import { fontSize } from '@/utils/fontSize'
// import TextLine from './TextLine'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import remarkBreaks from "remark-breaks";


type Props = {
    block: TextBlock
    enableMdSyntax?: boolean
}
const TextBlock = ({ block, enableMdSyntax=false }: Props) => {
    const isBold = block.isBold ? 'font-bold' : ''
    const isItalic = block.isItalic ? 'italic' : ''
    const align = block.align === 'left' ? 'text-start' : block.align === 'center' ? 'text-center' : 'text-end'
    const size = fontSize[block.size]
    const lines = block.text.split("\n")
    if (!enableMdSyntax) {
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
            <ReactMarkdown
                remarkPlugins={[remarkBreaks]}
                components={{
                    h1: ({ node, children }) => <h1 className={`${align} text-4xl font-bold capitalize text-neutral-200`}>{children}</h1>,
                    h2: ({ node, children }) => <h2 className={`${align} text-3xl font-bold capitalize text-neutral-200`}>{children}</h2>,
                    h3: ({ node, children }) => <h3 className={`${align} text-2xl font-bold capitalize text-neutral-200`}>{children}</h3>,
                    span: ({ node, children }) => <span className={`${align} shrink-0 min-h-[20px] text-neutral-300`}>{children}</span>,
                    text: ({ node, children }) => <span className={`${align} shrink-0 min-h-[20px] text-neutral-300`}>{children}</span>,
                    p: ({ node, children }) => <p className={`${align} shrink-0 min-h-[20px] text-neutral-300`}>{children}</p>,
                    a: ({ node, href, children }) => <Link className='text-blue-500 underline' href={href || '/'}>{children}</Link>
                }}
            >{block.text.replace(/\n/gi, "&nbsp; \n")}</ReactMarkdown>
            {/* {
                lines.map((line, index) => <TextLine align={align} line={line} key={line + index} />)
            } */}
        </div>
    )
}

export default TextBlock