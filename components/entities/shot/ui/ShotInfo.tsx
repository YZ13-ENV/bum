import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import React from 'react'
import ShotActions from './ShotActions'
import { BiChevronRight, BiChevronUp } from 'react-icons/bi'
import Image from 'next/image'
import Link from 'next/link'
import Avatar from '@/components/shared/ui/Avatar'
import { DateTime } from 'luxon'

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
        <div className='absolute left-0 z-20 flex flex-col w-full transition-all hover:bottom-0 -bottom-[86px] group/info h-fit'>
            <div className="relative flex items-center justify-center w-full h-12 pl-3 pr-1">
                <div className='absolute top-0 left-0 w-full h-full bg-opacity-25 bg-gradient-to-t from-black to-transparent'/>
                <div className="z-20 flex items-center w-full h-fit">
                    <span className='font-bold line-clamp-1 text-neutral-200'>{shot.title}</span>
                </div>
                <div className="z-20 flex items-center gap-1 w-fit h-fit">
                    <ShotActions shot={shot} />
                </div>
            </div>
            <div className="flex flex-col w-full gap-1 px-3 py-2 transition-all duration-300 bg-black rounded-b-xl h-fit shrink-0">
                <div className="flex items-center justify-between w-full gap-2 p-1 border h-fit rounded-xl border-neutral-800">
                    <Link href={`/${shot.authorId}`} className="flex items-center justify-between w-full gap-2 h-fit">
                        <div className="flex items-center h-full gap-2 w-fit">
                            <Avatar src={user ? user.photoUrl : null} size={36} />
                            <div className="flex flex-col h-full w-fit">
                                <span className='font-semibold text-neutral-200'>{user?.displayName}</span>
                                <span className='text-xs text-neutral-400'>{user?.email}</span>
                            </div>
                        </div>
                        <BiChevronRight size={25} className='text-neutral-400' />
                    </Link>
                </div>
                <span className='text-xs text-neutral-400'>{DateTime.fromSeconds(shot.createdAt).setLocale('ru').toRelative()}</span>
            </div>
        </div>
    )
}

export default ShotInfo