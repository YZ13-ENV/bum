import ShotCard from '@/components/entities/shot'
import { DocShotData } from '@/types'
import React from 'react'

type Props = {
    shots: DocShotData[]
}
const Shots = ({ shots }: Props) => {
    return (
        <div className="grid w-full grid-cols-1 grid-rows-4 gap-9 shrink-0 xl:grid-cols-3 xl:grid-rows-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-rows-2 md:grid-rows-2 sm:grid-rows-2">
            {
                shots.map((shotChunk, index) => 
                    <ShotCard key={`shotChunk#${index}#shot#${index + 1}`} shot={shotChunk} />
                )
            }
        </div>
    )
}

export default Shots