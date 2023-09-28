import React from 'react'
import { getShots, getUserShort } from '../helpers'
import SubLabel from '@/components/shared/SubLabel'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import { BiHeart, BiShow } from 'react-icons/bi'
import { DateTime } from 'luxon'
import { fetchFile } from '@/helpers/fetchFile'

type Props = {
    params: {
        userId: string
    }
}
const UserStatisticsPage = async({ params }: Props) => {
    const shotsData = getShots(params.userId, null)
    const userData = getUserShort(params.userId)
    const [shots, user] = await Promise.all([shotsData, userData])
    const views = shots && (user?.isSubscriber || false) ? shots.map(shot => shot.views.length).reduce((a, b) => a + b) : 0
    const likes = shots && (user?.isSubscriber || false) ? shots.map(shot => shot.likes.length).reduce((a, b) => a + b) : 0

    const popularShots = shots ? shots.sort((a, b) => b.views.length - a.views.length) : []
    const popularShot = popularShots.length ? popularShots[0] : null
    if (!(user?.isSubscriber || false)) return (
        <section className='flex flex-col items-center self-center justify-center w-full max-w-md gap-2 mx-auto h-fit'>
            <SubLabel/>
            <h2 className='text-lg font-semibold text-center text-neutral-200'>Статистика доступна с подпиской</h2>
        </section>
    )
    return (
        <section className='flex flex-col w-full h-full max-w-5xl gap-4 mx-auto overflow-y-auto'>
            <div className="flex flex-col items-center justify-center w-full gap-4 md:flex-row md:h-40 h-fit">
                <div className="flex flex-col items-center justify-center w-full px-4 py-2 md:w-1/3 md:h-full h-36 rounded-xl bg-neutral-900">
                    <span className='font-bold text-neutral-400'>Всего работ</span>
                    <span className='text-3xl font-bold md:text-7xl'>{shots?.length || 0}</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full px-4 py-2 md:w-1/3 md:h-full h-36 rounded-xl bg-neutral-900">
                    <span className='font-bold text-neutral-400'>Всего просмотров</span>
                    <span className='text-3xl font-bold md:text-7xl'>{views}</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full px-4 py-2 md:w-1/3 md:h-full h-36 rounded-xl bg-neutral-900">
                    <span className='font-bold text-neutral-400'>Всего лайков</span>
                    <span className='text-3xl font-bold md:text-7xl'>{likes}</span>
                </div>
            </div>
            {
                popularShot &&
                <div className="flex flex-col w-full h-48 gap-2 border md:flex-row shrink-0 rounded-xl border-neutral-800">
                    <div className="relative h-full aspect-[4/3] rounded-xl bg-neutral-900">
                        <MediaBlock link={popularShot.thumbnail ? popularShot.thumbnail.link : popularShot.rootBlock.link} object='cover' />
                    </div>
                    <div className="flex flex-col w-full h-full gap-2 p-4">
                        <span className='px-3 py-1 text-xs border rounded-md w-fit border-neutral-800 text-neutral-400 bg-neutral-900'>Самая популярная работа</span>
                        <span className='text-lg font-medium text-neutral-200'>{popularShot.title}</span>
                        <span className='text-xs text-neutral-400'>{DateTime.fromSeconds(popularShot.createdAt).toRelativeCalendar()}</span>
                        <div className="flex items-center gap-2 mt-auto w-fit h-fit">
                            <div className="flex items-center gap-1 px-3 py-1 border rounded-md w-fit border-neutral-800 text-neutral-400 bg-neutral-900 h-fit">
                                <BiShow size={15} />
                                <span className='text-xs text-neutral-400'>{popularShot.views.length}</span>
                            </div>
                            <div className="flex items-center gap-1 px-3 py-1 border rounded-md w-fit border-neutral-800 text-neutral-400 bg-neutral-900 h-fit">
                                <BiHeart size={15} />
                                <span className='text-xs text-neutral-400'>{popularShot.likes.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default UserStatisticsPage
