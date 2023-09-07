'use client'
import React, { useState } from 'react'
import LastWorks from '..'
import { Segmented, SegmentedProps } from 'antd'

type Props = {
    userId: string
    shotId: string
}
const WorksWrapper = ({ userId, shotId }: Props) => {
    const options: SegmentedProps['options'] = [
        {
            label: 'Популярные',
            value: 'popular'
        },
        {
            label: 'Новые',
            value: 'new'
        },
    ]
    const [tab, setTab] = useState<string>(options[0].toString())
    return (
        <div className="flex flex-col w-full h-full gap-2 md:w-4/12">
            <Segmented options={options} block defaultValue='popular' value={tab} onChange={e => setTab(e.toString())} />
            <LastWorks userId={userId} order={tab as 'popular' | 'new'} exclude={shotId} />
        </div>
    )
}

export default WorksWrapper