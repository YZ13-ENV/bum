'use client'
import { useInViewport } from 'ahooks'
import { ElementRef, useLayoutEffect, useRef, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {
    children: React.ReactNode
    predictedValue?: boolean
}
const ChunkWrapper = ({ children, predictedValue }: Props) => {
    const ref = useRef<ElementRef<'div'>>(null)
    const [inViewport] = useInViewport(ref);
    const [shotChunk, setShotChunk] = useState<boolean>(predictedValue ? predictedValue : inViewport ? inViewport : false)
    useLayoutEffect(() => {
        if (!shotChunk && inViewport) setShotChunk(true)
    },[inViewport])
    if (!shotChunk) {
        return (
            <div ref={ref} className="flex items-center justify-center w-full gap-2 h-fit">
                <BiLoaderAlt size={25} className='animate-spin' />
                <span>Подгружаем...</span>
            </div>
        )
    }
    return (
        <div ref={ref} className='grid min-h-fit home_grid gap-9'>{inViewport}{children}</div>
    )
}

export default ChunkWrapper