import dynamic from 'next/dynamic'
import { DocShotData } from '@/types'
import { memo } from 'react'
const MediaBlock = dynamic(() => import('../Blocks/MediaBlock')) 
const Link = dynamic(() => import('next/link')) 
const ShotWrapper = dynamic(() => import('./ui/ShotWrapper'))

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    if (shot.isDraft) return (
        <ShotWrapper shot={shot}>
            {
                shot.thumbnail 
                ? <MediaBlock {...{ link: shot.thumbnail.link, type: shot.thumbnail.link.endsWith('.mp4') ? 'video' : 'image' }} quality={100} object='cover' autoPlay={false} />
                : shot.rootBlock.link !== '' ? <MediaBlock {...shot.rootBlock} quality={75} object='cover' autoPlay={false} />
                : <div className='flex flex-col items-center justify-center w-full h-full'>
                    <span className='text-xs text-center text-neutral-400'>Нет обложки</span>
                </div>
            }
        </ShotWrapper>
    )
    return (
        <ShotWrapper shot={shot}>
            <Link scroll={false} href={`/${shot.authorId}/${shot.doc_id}`} className='relative w-full aspect-[4/3] h-full'>
                {
                    shot.thumbnail
                    ? <MediaBlock {...{ link: shot.thumbnail.link, type: shot.thumbnail.link.endsWith('.mp4') ? 'video' : 'image' }} quality={100} object='cover' autoPlay={false} />
                    : <MediaBlock {...shot.rootBlock} quality={75} object='cover' autoPlay={false} />
                }
            </Link>
        </ShotWrapper>
    )
}

export default memo(ShotCard)