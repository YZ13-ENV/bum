import React from 'react'
import dynamic from 'next/dynamic'
const ShotCard = dynamic(() => import('../entities/shot'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse' />
})

const BodyWrapper = () => {
    return (
        <div 
        className="flex flex-col w-full h-full gap-6 px-4 pb-4 root_grid_wrapper shrink-0">
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
            </div>
        </div>
    )
}

export default BodyWrapper