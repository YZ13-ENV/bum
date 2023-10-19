'use client'
import BlocksOut from '@/components/entities/uploader/ui/LeftSide/BlocksOut'
import { Segmented } from 'antd'
import { useState } from 'react'
import PrevWorks from './PrevWorks'

const LeftSide = () => {
    const [tab, setTab] = useState<string>('blocks')
    const options = [
        {
            label: 'Добавленные блоки',
            value: 'blocks'
        },
        {
            label: 'Черновики',
            value: 'drafts'
        }
    ]
    return (
        <>
            <Segmented block size='large' options={options} value={tab} onChange={e => setTab(e.toString())} defaultValue='blocks' />
            {
                tab === 'blocks'
                ? <BlocksOut />
                : <PrevWorks />
            }
        </>
    )
}

export default LeftSide