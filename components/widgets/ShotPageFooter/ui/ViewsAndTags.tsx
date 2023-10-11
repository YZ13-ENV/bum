import { largeNumber } from '@/helpers/largeNumbers'
import { DocShotData } from '@/types'
import { DateTime } from 'luxon'
import Link from 'next/link'
import React from 'react'

type Props = {
    tags: DocShotData['tags'],
    createdAt: DocShotData['createdAt'],
    views: DocShotData['views']
}
const ViewsAndTags = ({ createdAt, tags, views }: Props) => {
    return (
        <div className="flex flex-col w-full gap-2 p-2 h-fit rounded-xl bg-neutral-900">
            <div className="flex items-center justify-between w-full h-fit">
                <div className="flex items-center gap-2 w-fit h-fit">
                    <span className='text-sm text-neutral-300'>{largeNumber(views.length)} просмотров</span>
                    <span className='text-sm text-neutral-300'>{DateTime.fromSeconds(createdAt).setLocale('ru').toLocaleString(DateTime.DATE_MED)}</span>
                </div>
                <div className="flex items-center w-fit h-fit">
                </div>
            </div>
            {
                tags.length !== 0 &&
                <div className="inline-flex flex-wrap w-full gap-1 h-fit">
                    {
                        tags.map((tag, index) => <Link key={tag + index} href={`/tags/${tag}`}
                            className='px-2 py-0.5 text-xs rounded-full border border-neutral-700 text-neutral-300 bg-neutral-800'>{tag}</Link>
                        )
                    }
                </div>
            }

        </div>
    )
}

export default ViewsAndTags