import dynamic from 'next/dynamic'
import { DocShotData } from '@/types'
import { memo } from 'react'
import GeneratedThumbnail from '../Blocks/MediaBlock/GeneratedThumbnail'
import { fetchFile } from '@/helpers/fetchFile'
import { linkToShot } from '@/helpers/linkTo'
const MediaBlock = dynamic(() => import('../Blocks/MediaBlock')) 
const Link = dynamic(() => import('next/link')) 
const ShotWrapper = dynamic(() => import('./ui/ShotWrapper'))

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    const stableLink = shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link
    const isVideo = stableLink.endsWith('.mp4')
    if (shot.isDraft) return (
        <ShotWrapper shot={shot}>
            {
                isVideo 
                ? <GeneratedThumbnail videoSrc={stableLink} />
                : <MediaBlock link={stableLink} quality={75} object='cover' autoPlay={false} />
            }
        </ShotWrapper>
    )
    return (
        <ShotWrapper shot={shot}>
            <Link scroll={false} href={linkToShot(shot.doc_id)} className='relative w-full aspect-[4/3] h-full'>
                {
                    process.env.NODE_ENV === 'development'
                    ? isVideo
                    ? <GeneratedThumbnail videoSrc='/dev-video.mp4' />
                    : <MediaBlock link='/original-error.png' quality={75} object='cover' autoPlay={false} />
                    : isVideo 
                    ? <GeneratedThumbnail videoSrc={stableLink} />
                    : <MediaBlock link={stableLink} quality={75} object='cover' autoPlay={false} />
                }
            </Link>
        </ShotWrapper>
    )
}

export default memo(ShotCard)