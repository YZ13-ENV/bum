import { DocShotData } from '@/types'
import { Suspense, memo } from 'react'
import Image from 'next/image'
import { fetchFile } from '@/helpers/fetchFile'
import ShotInfo from './ui/ShotInfo'
import Link from 'next/link'
import { linkToShot } from '@/helpers/linkTo'

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    const stableLink = shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link
    if (shot.isDraft) return null
    return (
        <Link scroll={false} href={linkToShot(shot.doc_id)} className="relative aspect-[4/3] w-full rounded-xl shrink-0 group transition-transform hover:scale-105 border border-neutral-800">
                <Suspense fallback={<div className='w-full h-full rounded-2xl bg-neutral-950 animate-pulse' />}>
                        {
                            process.env.NODE_ENV === 'development' 
                            ? null
                            : stableLink.endsWith('.mp4')
                            ? <video className="object-cover w-full h-full rounded-xl">
                                    <source src={fetchFile(stableLink)} />
                            </video>
                            : <Image src={fetchFile(stableLink)} fill className="object-cover rounded-xl" alt='img' />
                        }
                </Suspense>
                <Suspense fallback={<div className='absolute bottom-0 left-0 w-full h-8 rounded-xl bg-neutral-800'/>}>
                {
                    !shot.isDraft &&
                        <ShotInfo shot={shot} />
                }
                </Suspense>
        </Link>
    )
}

export default memo(ShotCard)