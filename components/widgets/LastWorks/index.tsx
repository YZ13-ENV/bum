import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import Link from 'next/link'
import React from 'react'

type Props = {
    displayName: string | null,
    userId: string
}
const getLastWorks = async(userId: string) => {
    try {
        const res = await fetch(`${getHost()}/shots/onlyShots?userId=${userId}&asDoc=true&limit=4`)
        const shots: DocShotData[] = await res.json()
        return shots
    } catch(e) {
        console.log(e)
        return []
    }
}
const LastWorks = async({ displayName, userId }: Props) => {
    const shots = await getLastWorks(userId)
    if (shots.length === 0) return null
    return (
        <div className={`grid w-full ${shots.length === 1 ? 'h-fit' : 'h-full'} gap-2 grid-cols-1 grid-rows-4`}>
            {
                shots.map((shot, index) => 
                    <Link href={`/${userId}/${shot.doc_id}`} 
                    key={shot.doc_id + index} className="w-full h-full snap-center aspect-[4/3] rounded-xl bg-neutral-700">
                        { shot.rootBlock.link !== '' && <MediaBlock {...shot.rootBlock} object='cover' server quality={25} /> }
                    </Link>
                )
            }
        </div>
    )
}

export default LastWorks