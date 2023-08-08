import React from 'react'
import ShotInfo from './ui/ShotInfo'
import { DocShotData } from '@/types'
import dynamic from 'next/dynamic'
const MediaBlock = dynamic(() => import('../Blocks/MediaBlock'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    return (
        <div className="relative w-full h-full overflow-hidden border border-neutral-800 rounded-2xl group">
            <MediaBlock {...shot.rootBlock} server quality={85} object='cover' />
            <ShotInfo shot={shot} />
        </div>
    )
}

export default ShotCard