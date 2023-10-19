'use client'
import { TextBlock } from '@/types'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import remarkBreaks from "remark-breaks";


type Props = {
    block: TextBlock
    enableMdSyntax?: boolean
}
const TextBlock = ({ block, enableMdSyntax=false }: Props) => {
    const align = block.align === 'left' ? 'text-start' : block.align === 'center' ? 'text-center' : 'text-end'
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
        </div>
    )
}

export default TextBlock