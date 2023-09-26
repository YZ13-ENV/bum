'use client'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
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
            const res = await fetch(`${getHost()}/shots/onlyShots?userId=${userId}&asDoc=true&limit=4&order=${order ? order : 'popular'}${exclude && `&exclude=${exclude}`}`)
            const shots: DocShotData[] = await res.json()
            setShots(shots)
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
                shots.map((shot, index) => 
                    <Link href={linkToShot(shot.doc_id)} 
                    key={shot.doc_id + index} className="w-full h-full snap-center aspect-[4/3] rounded-xl bg-neutral-700">
                        {
                            shot.thumbnail && shot.thumbnail.link !== ''
                            ? <MediaBlock {...shot.rootBlock} object='cover' quality={25} />
                            : shot.rootBlock.link !== '' && <MediaBlock {...shot.rootBlock} object='cover' quality={25} />
                        }
                    </Link>
                )
            }
        </div>
    )
}

export default LastWorks