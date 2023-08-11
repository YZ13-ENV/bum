import React, { memo } from 'react'
import { DocShotData } from '@/types'
import dynamic from 'next/dynamic'
import Link from 'next/link'
const ShotInfo = dynamic(() => import('./ui/ShotInfo')) 
const MediaBlock = dynamic(() => import('../Blocks/MediaBlock'), {
    loading: () => <div className='w-full min-h-[13rem] h-full rounded-xl bg-neutral-900' />
}) 

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    return (
        <div className="relative w-full h-full overflow-hidden transition-transform border border-neutral-900 rounded-2xl hover:scale-105 group">
            <Link href={`${shot.authorId}/${shot.doc_id}`} >
                <MediaBlock {...shot.rootBlock} server quality={75} object='cover' autoPlay={false} />
            </Link>
            <ShotInfo shot={shot} />
        </div>
    )
}

export default memo(ShotCard)