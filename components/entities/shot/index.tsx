import dynamic from 'next/dynamic'
const MediaBlock = dynamic(() => import('../Blocks/MediaBlock')) 
import React, { Suspense } from 'react'
import { DocShotData } from '@/types'
import Link from 'next/link'
import ShotWrapper from './ui/ShotWrapper'
import Image from 'next/image'

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    if (shot.isDraft) return (
        <ShotWrapper shot={shot}>
            {
                shot.thumbnail 
                ? <MediaBlock {...{ link: shot.thumbnail.link, type: 'image' }} server quality={100} object='cover' autoPlay={false} />
                : shot.rootBlock.link !== '' ? <MediaBlock {...shot.rootBlock} server quality={75} object='cover' autoPlay={false} />
                : <div className='flex flex-col items-center justify-center w-full h-full'>
                    <span className='text-xs text-center text-neutral-400'>Нет обложки</span>
                </div>
            }
        </ShotWrapper>
    )
    return (
        <ShotWrapper shot={shot}>
            <Link href={`/${shot.authorId}/${shot.doc_id}`} className='relative w-full h-full'>
                {
                    process.env.NODE_ENV === 'development'
                    ? <Image src='/original-error.png' width={200} height={100} alt='placeholder'/>
                    : shot.thumbnail
                    ? <MediaBlock {...{ link: shot.thumbnail.link, type: 'image' }} server quality={100} object='cover' autoPlay={false} />
                    : <MediaBlock {...shot.rootBlock} server quality={75} object='cover' autoPlay={false} />
                }
            </Link>
        </ShotWrapper>
    )
}

export default ShotCard