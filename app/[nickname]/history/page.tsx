import { db } from '@/utils/app'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import { DateTime } from 'luxon'
import { BiHeart, BiShow } from 'react-icons/bi'
import Link from 'next/link'
import { getShot, getShotWithCache, getUidFromNickname } from '@/app/fetchers'

type Props = {
    params: {
        nickname: string
    }
}
type HistoryUnit = {
    authorId: string
    createdAt: number
    shotId: string
}
type HistoryUnitWithId = HistoryUnit & { doc_id: string }
const UserHistoryPage = async({ params }: Props) => {
    const uid = await getUidFromNickname(params.nickname)
    return (
        <section className='flex flex-col w-full h-full max-w-5xl gap-4 mx-auto overflow-y-auto'>
            <div className="flex items-center justify-center w-full h-fit">
                <h1 className='text-2xl font-semibold text-neutral-200'>История просмотров</h1>
            </div>
            {
                uid
                ? <HistoryList uid={uid} />
                : <div className='flex flex-col items-center justify-center w-full h-full'>
                    Что-то пошло не так!
                </div>
            }
        </section>
    )
}

type HistoryListProps = {
    uid: string
}
const HistoryList = async({ uid }: HistoryListProps) => {
    const fixed = uid.replaceAll('"', '')
    const collRef = collection(db, 'users', fixed, 'history', 'views', 'dey')
    const snaps = await getDocs(collRef)
    const snapsWithDocs = snaps.empty === false ? snaps.docs.map(snap => ({...snap.data() as HistoryUnit, doc_id: snap.id} as HistoryUnitWithId)) : []
    if (snaps.empty) return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            Ваша история просмотров пуста!
        </div>
    )
    return snapsWithDocs.sort((a, b) => b.createdAt - a.createdAt).map(unit =>
        <HistoryCard key={unit.doc_id} historyUnit={unit} />
    )
}

type CardProps = {
    historyUnit: HistoryUnitWithId
}
const HistoryCard = async({ historyUnit }: CardProps) => {
    const shot = await getShot(historyUnit.shotId)
    const stableLink = shot?.thumbnail ? shot?.thumbnail.link : shot?.rootBlock.link
    if (!shot) return (
        <div className="flex items-center justify-center w-full h-48">
            <span className='text-sm text-center text-neutral-300'>Работа недоступна</span>
        </div>
    )
    return (
        <Link href={`/view?s=${shot.doc_id}`} 
        className="flex flex-col w-full gap-2 transition-colors border md:h-48 h-fit md:flex-row shrink-0 rounded-xl border-neutral-800 hover:bg-neutral-950">
            <div className="relative h-full aspect-[4/3] rounded-xl bg-neutral-900">
                <MediaBlock link={stableLink as string} object='cover' />
            </div>
            <div className="flex flex-col w-full h-full gap-2 p-4">
                { process.env.NODE_ENV === 'development' ? DateTime.fromSeconds(historyUnit.createdAt).toISO() : null }
                <span className='text-lg font-medium text-neutral-200'>{shot.title}</span>
                <span className='text-xs text-neutral-400'>Опубликовано: {DateTime.fromSeconds(shot.createdAt).setLocale('ru').toRelativeCalendar()}</span>
                <div className="flex items-center gap-2 mt-auto w-fit h-fit">
                    <div className="flex items-center gap-1 px-3 py-1 border rounded-md w-fit border-neutral-800 text-neutral-400 bg-neutral-900 h-fit">
                        <BiShow size={15} />
                        <span className='text-xs text-neutral-400'>{shot.views.length}</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 border rounded-md w-fit border-neutral-800 text-neutral-400 bg-neutral-900 h-fit">
                        <BiHeart size={15} />
                        <span className='text-xs text-neutral-400'>{shot.likes.length}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UserHistoryPage