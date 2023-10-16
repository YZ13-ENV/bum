import { getGroupDateObjects, getShotsViewsAsDateObjects } from '@/helpers/chart'
import { largeNumber } from '@/helpers/largeNumbers'
import { DocShotData } from '@/types'
import React from 'react'
import { BiRightArrowAlt, BiShow } from 'react-icons/bi'

type Props = {
    shots: DocShotData[]
}
const ViewsActivity = ({ shots }: Props) => {
    const viewsActivity = getGroupDateObjects(getShotsViewsAsDateObjects(shots))
    return (
        <div className="flex flex-col w-full gap-4 p-4 h-1/2 rounded-xl bg-neutral-900">
            <div className="flex items-center w-full gap-2">
                <BiShow size={19} />
                <span className='font-medium text-neutral-300'>Активность по просмотрам</span>
            </div>
            <div className="flex items-center justify-center w-full h-full gap-2">
                <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
                    <span className='text-xs text-neutral-300'>Прошлый месяц</span>
                    <span className='text-3xl font-semibold md:text-5xl text-neutral-200'>{largeNumber(viewsActivity?.prev || 0)}</span>
                </div>
                <BiRightArrowAlt size={21} />
                <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2">
                    <span className='text-xs text-neutral-300'>Текущий месяц</span>
                    <span className='inline-flex gap-1 text-3xl font-semibold md:text-5xl text-neutral-200'>
                        {largeNumber(viewsActivity?.current || 0)}
                        <sup className={`text-xs font-medium ${(viewsActivity?.percents || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>{(viewsActivity?.percents || 0) > 0 ? '+' : '-'}{viewsActivity?.percents}</sup>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ViewsActivity