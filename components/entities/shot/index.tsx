import React from 'react'
import ShotInfo from './ui/ShotInfo'
import { DocShotData } from '@/types'
// import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import dynamic from 'next/dynamic'
const ServerImageBlock = dynamic(() => import('../Blocks/ServerImageBlock'), {
    loading: () => <div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse' />
}) 

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    return (
        <div className="relative w-full h-full overflow-hidden border border-neutral-800 rounded-2xl group">
            <ServerImageBlock block={shot.rootBlock} />
            {/* <BlockImage imageLink={shot.rootBlock.link} /> */}
            <ShotInfo shot={shot} />
        </div>
    )
}

export default ShotCard