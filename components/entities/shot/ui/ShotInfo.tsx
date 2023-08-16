import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import React from 'react'
import ShotActions from './ShotActions'
import { BiChevronRight, BiChevronUp } from 'react-icons/bi'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    shot: DocShotData
}
const getShortData = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', cache: 'no-cache' })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        console.log(e)
        return null
    }
}
const ShotInfo = async({ shot }: Props) => {
    const user = await getShortData(shot.authorId)
    return (
        <div className='absolute bottom-0 left-0 z-20 flex flex-col w-full transition-transform h-fit'>
            <div className="relative flex items-center justify-center w-full py-2 h-fit">
                <div className="p-1 rounded-full w-fit h-fit bg-neutral-900"><BiChevronUp size={15} className='rotate-0 group-hover:rotate-180 text-neutral-200' /></div>
                <div className="absolute top-0 flex items-center gap-2 right-1 w-fit h-fit">
                    <ShotActions shot={shot} />
                </div>
            </div>
            <div className="flex w-full h-0 p-0 overflow-hidden transition-all duration-500 border group-hover:p-2 group-hover:h-20 group-hover:overflow-y-auto shrink-0 rounded-xl bg-neutral-900 border-neutral-700">
                <div className="flex items-center justify-between w-full gap-2 p-1 h-fit rounded-xl bg-neutral-800">
                    <Link href={`/${shot.authorId}`} className="flex items-center gap-2 w-fit h-fit">
                        <Image src={user?.photoUrl || ''} width={36} height={36} className='rounded-full' alt={`${shot.authorId}-${shot.doc_id}`} />
                        <div className="flex flex-col h-full w-fit">
                            <span className='font-semibold text-neutral-200'>{user?.displayName}</span>
                            <span className='text-xs text-neutral-400'>{user?.displayName}</span>
                        </div>
                    </Link>
                    <BiChevronRight size={25} className='text-neutral-400' />
                </div>
            </div>
        </div>
    )
}

export default ShotInfo