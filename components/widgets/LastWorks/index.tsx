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
        <div className="flex flex-col justify-between w-full max-w-4xl gap-4 p-3 mx-auto mt-auto border h-96 shrink-0 rounded-xl border-neutral-700">
            <div className="flex items-center justify-between w-full h-fit">
                <span className='text-neutral-400'>Больше от <span className='font-bold text-neutral-200'>{displayName || 'Пользователь'}</span></span>
                <Link className='inline-flex items-center gap-1 text-sm text-neutral-300' href={`/${userId}`}>Посмотреть все <BiChevronRight size={15} /></Link>
            </div>
            <div className="w-full overflow-y-auto h-80 snap-y snap-mandatory snap-always">
                <div className="grid gap-2 home_grid">
                    {
                        shots.map((shot, index) => 
                            <Link href={`/${userId}/${shot.doc_id}`} 
                            key={shot.doc_id + index} className="w-full h-full snap-center rounded-xl bg-neutral-700">
                                { shot.rootBlock.link !== '' && <MediaBlock {...shot.rootBlock} object='cover' server quality={25} /> }
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default LastWorks