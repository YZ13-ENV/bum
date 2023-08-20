import React, { Suspense } from 'react'
import { DocShotData } from '@/types'
import ShotCard from '../entities/shot'
type Props = {
    shots: DocShotData[]
}
const BodyWrapper = ({ shots }: Props) => {
    if (shots.length === 0) return (
        <div className="flex items-center justify-center w-full h-full">
            <span className='px-3 py-1 text-sm border rounded-full border-neutral-700 text-neutral-400 bg-neutral-900'>Пока что нет работ для просмотра</span>
        </div>
    )
    return (
        <div className='grid px-4 min-h-fit home_grid gap-9 md:px-12'>
            {
                shots.map((shotChunk, index) => 
                    <Suspense key={`shotChunk#${index}#shot#${index + 1}`} 
                    fallback={<div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse'/>}>
                        <ShotCard shot={shotChunk} />
                    </Suspense>
                )
            }
        </div>
    )
}

export default BodyWrapper