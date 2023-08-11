import dynamic from 'next/dynamic'
const MediaBlock = dynamic(() => import('../Blocks/MediaBlock')) 
const ShotInfo = dynamic(() => import('./ui/ShotInfo')) 
import React, { Suspense } from 'react'
import { DocShotData } from '@/types'
import Link from 'next/link'

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    return (
        <div className="relative overflow-hidden transition-transform border shrink-0 border-neutral-900 rounded-2xl hover:scale-105 group">
            <Suspense>
                <Link href={`${shot.authorId}/${shot.doc_id}`} >
                    <MediaBlock {...shot.rootBlock} server quality={75} object='cover' autoPlay={false} />
                </Link>
            </Suspense>
            <Suspense>
                <ShotInfo shot={shot} />
            </Suspense>
        </div>
    )
}

export default ShotCard