import React from 'react'
import dynamic from 'next/dynamic'
import { DocShotData } from '@/types'
const ShotCard = dynamic(() => import('../entities/shot'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse' />
})
type Props = {
    shots: DocShotData[]
}
const BodyWrapper = ({ shots }: Props) => {
    if (shots.length === 0) return (
        <div className="flex items-center justify-center w-full h-full">
            <span className='text-sm text-neutral-400'>Пока что нет работ для просмотра</span>
        </div>
    )
    return (
        /* 
            Когда будет уже много работ загруженно, тогда нужно будет реализовать пагинацию
        */
        <div className="flex flex-col w-full h-full p-4 md:p-12 root_grid_wrapper shrink-0">
            {
                <div className="grid w-full grid-cols-1 grid-rows-4 gap-9 shrink-0 2xl:grid-cols-5 2xl:grid-rows-1 xl:grid-cols-4 xl:grid-rows-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-rows-2 md:grid-rows-2 sm:grid-rows-2">
                    {
                        shots.map((shotChunk, index) => 
                            <ShotCard key={`shotChunk#${index}#shot#${index + 1}`} shot={shotChunk} />
                        )
                    }
                </div>
            }
        </div>
    )
}

export default BodyWrapper