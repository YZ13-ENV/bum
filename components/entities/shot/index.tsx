import React from 'react'
import ShotInfo from './ui/ShotInfo'
import { DocShotData } from '@/types'
import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    return (
        <div className="relative w-full h-full overflow-hidden border border-neutral-800 rounded-2xl group">
            <BlockImage imageLink={shot.rootBlock.link} />
            <ShotInfo shot={shot} />
        </div>
    )
}

export default ShotCard