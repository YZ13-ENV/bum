import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import Link from 'next/link'
import React from 'react'
import { BiChevronRight } from 'react-icons/bi'

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
        <div className="grid w-full h-full gap-2 mini_grid">
            {
                shots.map((shot, index) => 
                    <Link href={`/${userId}/${shot.doc_id}`} 
                    key={shot.doc_id + index} className="w-full h-full snap-center rounded-xl bg-neutral-700">
                        { shot.rootBlock.link !== '' && <MediaBlock {...shot.rootBlock} object='cover' server quality={25} /> }
                    </Link>
                )
            }
        </div>
    )
}

export default LastWorks