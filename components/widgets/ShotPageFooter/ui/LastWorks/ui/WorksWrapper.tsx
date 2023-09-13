'use client'
import { useState } from 'react'
import LastWorks from '..'
import { Segmented } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'

type Props = {
    userId: string
    shotId: string
}
const WorksWrapper = ({ userId, shotId }: Props) => {
    const options = [
        {
            label: 'Популярные',
            value: 'popular'
        },
        {
            label: 'Новые',
            value: 'new'
        },
    ]
    const [tab, setTab] = useState<SegmentedValue>(options[0].value)
    return (
        <div className="flex flex-col w-full h-full gap-2 md:w-4/12">
            <Segmented size='large' block default defaultValue='popular' options={options} value={tab} onChange={e => setTab(e)} />
            <LastWorks userId={userId} order={tab as 'popular' | 'new'} exclude={shotId} />
        </div>
    )
}

export default WorksWrapper