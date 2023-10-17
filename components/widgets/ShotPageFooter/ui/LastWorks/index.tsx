'use client'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import GeneratedThumbnail from '@/components/entities/Blocks/MediaBlock/GeneratedThumbnail'
// import { fetchFile } from '@/helpers/fetchFile'
import { getHost } from '@/helpers/getHost'
import { linkToShot } from '@/helpers/linkTo'
import { DocShotData } from '@/types'
import Link from 'next/link'
import { useLayoutEffect, useState } from 'react'

type Props = {
    userId: string
    order?: 'popular' | 'new'
    exclude?: string
}

const LastWorks = ({ userId, exclude, order }: Props) => {
    const [shots, setShots] = useState<DocShotData[]>([]) 
    const getLastWorks = async(userId: string, exclude: Props['exclude'], order: Props['order']) => {
        try {
            const res = await fetch(`${getHost()}/shots/onlyShots/${userId}?limit=4&order=${order ? order : 'popular'}${exclude && `&exclude=${exclude}`}`)
            if (res.ok) {
                const shots: DocShotData[] = await res.json()
                setShots(shots)
            } else setShots([])
        } catch(e) {
            console.log(e)
            setShots([])
        }
    }
    useLayoutEffect(() => {
        getLastWorks(userId, exclude, order)
    },[userId, exclude, order])
    if (shots.length === 0) return null
    return (
        <div className={`grid w-full h-fit gap-2 last_works_grid`}>
            {
                shots.map((shot, index) => {
                    const isVideo = (shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link).endsWith('.mp4')
                    const stableLink = shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link
                    return (
                        <Link href={linkToShot(shot.doc_id)} 
                        key={shot.doc_id + index} className="relative w-full h-full snap-center aspect-[4/3] rounded-xl bg-neutral-700">
                            {
                                isVideo 
                                ? <GeneratedThumbnail thumbnailLink={shot.thumbnail?.link as string | null} videoLink={shot.rootBlock.link} />
                                : <MediaBlock link={stableLink} quality={75} object='cover' autoPlay={false} />
                            }
                        </Link>
                    )
                }

                )
            }
        </div>
    )
}

export default LastWorks