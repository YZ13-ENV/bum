'use client'
import { useInViewport } from 'ahooks'
import React, { ElementRef, useRef } from 'react'

type Props = {
    children: React.ReactNode
}
const ChunkWrapper = ({ children }: Props) => {
    const ref = useRef<ElementRef<'div'>>(null)
    const [inViewport] = useInViewport(ref);
    if (!inViewport) {
        return (
            <div ref={ref} className="w-full h-36 rounded-xl bg-neutral-900" />
        )
    }
    return (
        <div ref={ref} className='grid min-h-fit home_grid gap-9'>{inViewport}{children}</div>
    )
}

export default ChunkWrapper