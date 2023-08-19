'use client'
import { useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import { animated, useSpring } from '@react-spring/web'
type Props = {
    children: React.ReactNode
}
const Wrapper = ({ children }: Props) => {
    const blockExpanded = useAppSelector(state => state.uploader.modals.blocksSidebar)
    const spring = useSpring({
        from: {
            right: !blockExpanded ? '0%' : '-100%'
        },
        to: {
            right: !blockExpanded ? '-100%' : '0%'
        }
    })
    return (
        <animated.div style={{...spring}} className={`absolute flex-col border-l border-neutral-800
        w-full h-full max-w-sm gap-2 p-4 flex bg-black z-10 upload_sidebar overflow-y-auto`}>
            {blockExpanded && children}
        </animated.div>
    )
}

export default Wrapper