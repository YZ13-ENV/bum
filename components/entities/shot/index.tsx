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
    if (shot.isDraft) return (
        <div className="relative overflow-hidden transition-transform border shrink-0 border-neutral-900 rounded-2xl hover:scale-105 group">
                {
                    shot.thumbnail 
                    ? <MediaBlock {...{ link: shot.thumbnail.link, type: 'image' }} server quality={100} object='cover' autoPlay={false} />
                    : shot.rootBlock.link !== '' ? <MediaBlock {...shot.rootBlock} server quality={75} object='cover' autoPlay={false} />
                    : <div className='flex flex-col items-center justify-center w-full h-96'>
                        <span className='text-xs text-center text-neutral-400'>Нет обложки</span>
                    </div>
                }
        </div>
    )
    return (
        <div className="relative overflow-hidden transition-transform border shrink-0 border-neutral-900 rounded-2xl hover:scale-105 group">
            <Suspense fallback={<div className='w-full h-full rounded-xl' />}>
                <Link href={`${shot.authorId}/${shot.doc_id}`} >
                    {
                        shot.thumbnail
                        ? <MediaBlock {...{ link: shot.thumbnail.link, type: 'image' }} server quality={100} object='cover' autoPlay={false} />
                        : <MediaBlock {...shot.rootBlock} server quality={75} object='cover' autoPlay={false} />
                    }
                </Link>
            </Suspense>
            <Suspense>
                <ShotInfo shot={shot} />
            </Suspense>
        </div>
    )
}

export default ShotCard