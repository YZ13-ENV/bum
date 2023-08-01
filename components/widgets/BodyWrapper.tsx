import React from 'react'
import { useAppSelector } from '../entities/store/store'
import dynamic from 'next/dynamic'
const ShotCard = dynamic(() => import('../entities/shot'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse' />
})

const BodyWrapper = () => {
    const userObserver = useAppSelector(state => state.user)
    return (
        <div 
        className="grid w-full h-full grid-cols-4 grid-rows-3 gap-3 p-3">
            <ShotCard />
            <ShotCard />
            <ShotCard />
            <ShotCard />

            <ShotCard />
            <ShotCard />
            <ShotCard />
            <ShotCard />
            
            <ShotCard />
            <ShotCard />
            <ShotCard />
            <ShotCard />

        </div>
    )
}

export default BodyWrapper