'use client'
import { useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import { animated, useSpring } from '@react-spring/web'
type Props = {
    children: React.ReactNode
}
const Wrapper = ({ children }: Props) => {
    const prevWorksExpanded = useAppSelector(state => state.uploader.modals.prevWorkSidebar)
    const spring = useSpring({
        from: {
            left: !prevWorksExpanded ? '0%' : '-100%'
        },
        to: {
            left: !prevWorksExpanded ? '-100%' : '0%'
        }
    })
    return (
        <animated.div style={{...spring}} className={`absolute flex-col border-r border-neutral-800
        w-full h-full max-w-sm gap-2 p-4 flex bg-black z-10 upload_sidebar overflow-y-auto`}>
            {prevWorksExpanded && children}
        </animated.div>
    )
}

export default Wrapper