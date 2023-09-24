import dynamic from 'next/dynamic'
const ShotInfo = dynamic(() => import('./ShotInfo')) 
import { DocShotData } from '@/types'
import { Suspense } from 'react'
import { BiPlay } from 'react-icons/bi'


type Props = {
    children: React.ReactNode
    shot: DocShotData
}
const ShotWrapper = ({ children, shot }: Props) => {
    const stableLink = shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link
    const isVideo = stableLink.endsWith('.mp4')
    return (
        <article className="relative overflow-hidden aspect-[4/3] w-full h-full rounded-xl shrink-0 group transition-transform hover:scale-105">
            { isVideo && <BiPlay className='absolute z-10 top-3 right-3 group-hover:hidden' size={25} /> }
            {children}
            {
                !shot.isDraft &&
                <Suspense fallback={<div className='w-full h-5 rounded-xl bg-neutral-900'/>}>
                    <ShotInfo shot={shot} />
                </Suspense>
            }
        </article>
    )
}

export default ShotWrapper