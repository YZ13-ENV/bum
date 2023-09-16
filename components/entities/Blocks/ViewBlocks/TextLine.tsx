import Link from 'next/link'
import React from 'react'

type Props = {
    line: string
    align: "text-center" | "text-start" | "text-end"
}
const TextLine = ({ line, align }: Props) => {
    const isH1 = line.startsWith('#')
    const isH2 = line.startsWith('##')
    const isH3 = line.startsWith('###')
    const isQuote = line.startsWith('>')
    const isRealH1 = isH1 && !isH2 && !isH3
    const isRealH2 = isH1 && isH2 && !isH3
    const isRealH3 = isH1 && isH2 && isH3
    const hasBold = line.match(/\*\*\s?([^\n]+)\*\*/g)
    const hasLink = line.match(/\[([^\n]+)\]\(([^\n]+)\)/g)
    if (isRealH1) return <h1 className={`${align} text-4xl font-bold capitalize text-neutral-200`}>{line.replace('# ', '')}</h1>
    if (isRealH2) return <h2 className={`${align} text-3xl font-bold capitalize text-neutral-200`}>{line.replace('## ', '')}</h2>
    if (isRealH3) return <h3 className={`${align} text-2xl font-bold capitalize text-neutral-200`}>{line.replace('### ', '')}</h3>
    if (isQuote) return <span className={`${align} p-2 text-sm capitalize rounded-md text-neutral-300 bg-neutral-900`}>{line.replace('> ', '')}</span>
    if (hasBold !== null) return <span className={`${align} shrink-0 min-h-[20px] text-neutral-200`}
    >{line.split(/\*\*\s?([^\n]+)\*\*/g).map((chunk, chunkIndex) => {
        if (chunk.startsWith(' ') || chunk.endsWith(' ')) return <span key={chunk + chunkIndex}>{chunk}</span>
        return <b className='font-bold' key={chunk + chunkIndex}>{chunk}</b>
    })}</span>
    if (hasLink) {
        const lineForParse = line.split(/\[([^\n]+)\]\(([^\n]+)\)/g).filter(word => word !== '')
        const link = lineForParse.filter(word => !word.startsWith(' ') && !word.endsWith(' '))
        const finalString = lineForParse.filter(word => !word.includes('http' || 'https')).map(word => {
            if (link.includes(word)) {
                return link
            } return word
        })
        return(
            <span className={`${align} shrink-0 min-h-[20px] text-neutral-200`}
            >{finalString.map((chunk, chunkIndex) => {
                if (typeof chunk === 'string') {
                    return <span key={chunk + chunkIndex}>{chunk}</span>
                } else return <Link href={chunk[1]} className='text-blue-500 underline'>{chunk[0]}</Link>
            })
            }
            </span>
        )
    }
        return (
        <span className={`${align} shrink-0 min-h-[20px] text-neutral-300`}>{line}</span>
    )
}

export default TextLine