import React from 'react'
import ShotInfo from './ui/ShotInfo'
import { DocShotData } from '@/types'
import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'

type Props = {
    shot: DocShotData
}
const ShotCard = ({ shot }: Props) => {
    return (
        <div className="relative w-full h-full overflow-hidden border rounded-2xl border-neutral-700 group bg-neutral-900">
            <BlockImage imageLink={shot.rootBlock.link} />
            <ShotInfo shot={shot} />
        </div>
    )
}

export default ShotCard