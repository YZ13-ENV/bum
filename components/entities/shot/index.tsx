import React from 'react'
import ShotInfo from './ui/ShotInfo'
import { DocShotData } from '@/types'
import dynamic from 'next/dynamic'
import Link from 'next/link'
const MediaBlock = dynamic(() => import('../Blocks/MediaBlock'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900' />
}) 

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    return (
        <Link href={`${shot.authorId}/${shot.doc_id}`} 
        className="relative w-full h-full overflow-hidden transition-transform border border-neutral-900 rounded-2xl hover:scale-105 group">
            <MediaBlock {...shot.rootBlock} server quality={85} object='cover' autoPlay={false} />
            <ShotInfo shot={shot} />
        </Link>
    )
}

export default ShotCard