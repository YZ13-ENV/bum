import React from 'react'
import { getShots, getShortByNickname } from '../helpers'
import SubLabel from '@/components/shared/SubLabel'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import { BiHeart, BiShow } from 'react-icons/bi'
import { DateTime } from 'luxon'
import Link from 'next/link'
import CommonActivity from './CommonActivity'
import LikesActivity from './LikesActivity'
import ViewsActivity from './ViewsActivity'

type Props = {
    params: {
        nickname: string
    }
}
const UserStatisticsPage = async({ params }: Props) => {
    const shotsData = getShots(params.nickname, null)
    const userData = getShortByNickname(params.nickname)
    const [shots, user] = await Promise.all([shotsData, userData])
    const popularShots = shots ? shots.sort((a, b) => b.views.length - a.views.length) : []
    const shotsSlice = popularShots.slice(0, 3)
    if (!(user?.isSubscriber || false)) return (
        <section className='flex flex-col-reverse items-center self-center justify-center w-full max-w-md gap-2 p-4 mx-auto md:flex-row h-fit'>
            <h2 className='text-lg font-semibold text-center text-neutral-200'>Статистика доступна с подпиской</h2>
            <SubLabel/>
        </section>
    )
    return (
        <section className='flex flex-col w-full h-full max-w-5xl gap-4 pb-4 mx-auto overflow-y-auto'>
            <div className="flex flex-col items-start w-full gap-2 xl:h-96 h-fit xl:flex-row lg:flex-col">
                <CommonActivity shots={shots || []} />
                <div className="flex flex-col w-full h-full gap-2 xl:flex-col lg:flex-row md:flex-col xl:w-1/3">
                    <LikesActivity shots={shots || []} />
                    <ViewsActivity shots={shots || []} />
                </div>
            </div>
            <div className="flex items-center justify-center w-full gap-4 h-fit">
                <hr className='w-full border-neutral-700' />
                <span className='text-center shrink-0 text-neutral-400'>Ваши самые популярные работы</span>
                <hr className='w-full border-neutral-700' />
            </div>
            {
                shotsSlice.length !== 0 &&
                shotsSlice.map((shot, index) =>
                    <Link href={`/view?s=${shot.doc_id}`} key={shot.doc_id}
                    className="flex flex-col w-full gap-2 transition-colors border md:h-48 h-fit md:flex-row shrink-0 rounded-xl border-neutral-800 hover:bg-neutral-950">
                        <div className="relative h-full aspect-[4/3] rounded-xl bg-neutral-900">
                            <MediaBlock link={shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link} object='cover' />
                        </div>
                        <div className="flex flex-col w-full h-full gap-2 p-4">
                            { process.env.NODE_ENV === 'development' ? DateTime.fromSeconds(shot.createdAt).toISO() : null }
                            <span className='text-lg font-medium text-neutral-200'>{shot.title}</span>
                            <span className='text-xs text-neutral-400'>{DateTime.fromSeconds(shot.createdAt).toRelativeCalendar()}</span>
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
        </section>
    )
}

export default UserStatisticsPage
