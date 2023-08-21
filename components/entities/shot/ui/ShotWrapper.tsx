import dynamic from 'next/dynamic'
const ShotInfo = dynamic(() => import('./ShotInfo')) 
import { DocShotData } from '@/types'
import React, { Suspense } from 'react'


type Props = {
    children: React.ReactNode
    shot: DocShotData
}
const ShotWrapper = ({ children, shot }: Props) => {
    return (
        <div className="relative overflow-hidden border aspect-[4/3] w-full h-full shrink-0 border-neutral-900 rounded-2xl group">
            {children}
            {
                !shot.isDraft &&
                <Suspense fallback={<div className='w-full h-5 rounded-xl bg-neutral-900'/>}>
                    <ShotInfo shot={shot} />
                </Suspense>
            }
        </div>
    )
}

export default ShotWrapper