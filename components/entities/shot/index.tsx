import React, { Suspense } from 'react'
import { DocShotData } from '@/types'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { BiImage } from 'react-icons/bi'
const ShotInfo = dynamic(() => import('./ui/ShotInfo'), {
    loading: () => <div className='flex items-center justify-between w-full p-2 h-fit'>
        <div className='w-12 h-4 rounded-xl bg-neutral-900 animate-pulse' />
        <div className="flex items-center gap-2 w-fit h-fit">
            <div className='w-8 h-4 rounded-xl bg-neutral-900 animate-pulse' />
            <div className='w-8 h-4 rounded-xl bg-neutral-900 animate-pulse' />
        </div>
    </div>
}) 
const MediaBlock = dynamic(() => import('../Blocks/MediaBlock'), {
    loading: () => <div className='flex items-center justify-center w-full h-full shrink-0 rounded-xl bg-neutral-900' ><BiImage size={17} /></div>
}) 

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    return (
        <div className="relative w-full h-full overflow-hidden transition-transform border shrink-0 border-neutral-900 rounded-2xl hover:scale-105 group">
            <Suspense fallback={<div className='flex items-center justify-center w-full h-full shrink-0 rounded-xl bg-neutral-900' ><BiImage size={17} /></div>}>
                <Link href={`${shot.authorId}/${shot.doc_id}`} >
                    <MediaBlock {...shot.rootBlock} server quality={75} object='cover' autoPlay={false} />
                </Link>
            </Suspense>
            <Suspense fallback={ <div className='flex items-center justify-between w-full p-2 h-fit'>
                <div className='w-12 h-4 rounded-xl bg-neutral-900 animate-pulse' />
                <div className="flex items-center gap-2 w-fit h-fit">
                    <div className='w-8 h-4 rounded-xl bg-neutral-900 animate-pulse' />
                    <div className='w-8 h-4 rounded-xl bg-neutral-900 animate-pulse' />
                </div>
            </div>
            }>
                <ShotInfo shot={shot} />
            </Suspense>
        </div>
    )
}

export default ShotCard