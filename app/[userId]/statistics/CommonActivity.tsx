import { DocShotData } from '@/types'
import React from 'react'
import { BsActivity } from 'react-icons/bs'

type Props = {
    shots: DocShotData[]
}
const CommonActivity = ({ shots }: Props) => {
    const views = shots.map(shot => shot.views.length).reduce((a, b) => a + b)
    const likes = shots.map(shot => shot.likes.length).reduce((a, b) => a + b)
    return (
        <div className="flex flex-col w-full h-full gap-2 p-3 rounded-lg xl:w-2/3 bg-neutral-900">
            <div className="flex items-center w-full gap-2">
                <BsActivity size={19} />
                <span className='font-medium text-neutral-300'>Общая активность</span>
            </div>
            <div className="grid w-full h-full grid-cols-2 grid-rows-2 gap-2">
                <div className="flex flex-col items-center justify-center w-full h-full col-span-2 px-4 py-2 rounded-xl bg-neutral-950">
                    <span className='font-bold text-neutral-400'>Всего работ</span>
                    <span className='text-3xl font-bold md:text-7xl'>{shots?.length || 0}</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full px-4 py-2 rounded-xl bg-neutral-950">
                    <span className='text-sm font-semibold text-center text-neutral-400'>Всего просмотров</span>
                    <span className='text-xl font-semibold md:text-5xl'>{views}</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full px-4 py-2 rounded-xl bg-neutral-950">
                    <span className='text-sm font-semibold text-center text-neutral-400'>Всего лайков</span>
                    <span className='text-xl font-semibold md:text-5xl'>{likes}</span>
                </div>
            </div>
        </div>
    )
}

export default CommonActivity