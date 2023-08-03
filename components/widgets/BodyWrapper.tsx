import React from 'react'
import dynamic from 'next/dynamic'
import { DocShotData } from '@/types'
const ShotCard = dynamic(() => import('../entities/shot'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse' />
})
type Props = {
    shots: DocShotData[][]
}
const BodyWrapper = ({ shots }: Props) => {
    if (shots.length === 0) return (
        <div className="flex items-center justify-center w-full h-full">
            <span className='text-sm text-neutral-400'>Пока что нет работ для просмотра</span>
        </div>
    )
    return (
        <div 
        className="flex flex-col w-full h-full gap-6 px-4 pb-4 root_grid_wrapper shrink-0">
            {
                shots.map((shotChunk, index) => 
                    <div key={`shotChunk#${index}`}
                    className="grid w-full shrink-0 md:h-72 sm:h-[36rem] h-[72rem] grid-cols-1 md:grid-rows-1 sm:grid-rows-2 grid-rows-4 gap-6 md:grid-cols-4 sm:grid-cols-2">
                        {
                            shotChunk.map((shot, shotIndex) => 
                                <ShotCard key={`shotChunk#${index}#shot#${shotIndex}`} shot={shot} />
                            )
                        }
                    </div>
                )
            }
            {/* 
            <div className="grid w-full shrink-0 md:h-64 sm:h-[32rem] h-[64rem] grid-cols-1 md:grid-rows-1 sm:grid-rows-2 grid-rows-4 gap-6 md:grid-cols-4 sm:grid-cols-2">
                <ShotCard />
                <ShotCard />
                <ShotCard />
                <ShotCard />
            </div>
            <div className="grid w-full shrink-0 md:h-64 sm:h-[32rem] h-[64rem] grid-cols-1 md:grid-rows-1 sm:grid-rows-2 grid-rows-4 gap-6 md:grid-cols-4 sm:grid-cols-2">
                <ShotCard />
                <ShotCard />
                <ShotCard />
                <ShotCard />
            </div>
            <div className="grid w-full shrink-0 md:h-64 sm:h-[32rem] h-[64rem] grid-cols-1 md:grid-rows-1 sm:grid-rows-2 grid-rows-4 gap-6 md:grid-cols-4 sm:grid-cols-2">
                <ShotCard />
                <ShotCard />
                <ShotCard />
                <ShotCard />
            </div>
            <div className="grid w-full shrink-0 md:h-64 sm:h-[32rem] h-[64rem] grid-cols-1 md:grid-rows-1 sm:grid-rows-2 grid-rows-4 gap-6 md:grid-cols-4 sm:grid-cols-2">
                <ShotCard />
                <ShotCard />
                <ShotCard />
                <ShotCard />
            </div>
            <div className="grid w-full shrink-0 md:h-64 sm:h-[32rem] h-[64rem] grid-cols-1 md:grid-rows-1 sm:grid-rows-2 grid-rows-4 gap-6 md:grid-cols-4 sm:grid-cols-2">
                <ShotCard />
                <ShotCard />
                <ShotCard />
                <ShotCard />
            </div>
            <div className="grid w-full shrink-0 md:h-64 sm:h-[32rem] h-[64rem] grid-cols-1 md:grid-rows-1 sm:grid-rows-2 grid-rows-4 gap-6 md:grid-cols-4 sm:grid-cols-2">
                <ShotCard />
                <ShotCard />
                <ShotCard />
                <ShotCard />
            </div> */}
        </div>
    )
}

export default BodyWrapper