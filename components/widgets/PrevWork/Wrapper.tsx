'use client'
import { useAppSelector } from '@/components/entities/store/store'
import React from 'react'

type Props = {
    children: React.ReactNode
}
const Wrapper = ({ children }: Props) => {
    const prevWorksExpanded = useAppSelector(state => state.uploader.prevWorkSidebar)
    return (
        <div className={`absolute ${prevWorksExpanded ? 'left-0' : '-left-[100%]'}  flex-col border-r border-neutral-800
        w-full h-full max-w-sm gap-2 p-4 flex bg-black z-10 upload_sidebar overflow-y-auto`}>
            {children}
        </div>
    )
}

export default Wrapper