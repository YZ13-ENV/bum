import Chunker from '@/components/widgets/ChunkModule/Chunker'
import React, { Suspense } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {
    params: {
        order: string
    }
}
const ShotsByOrder = ({ params }: Props) => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center w-full h-full shot_wrapper"><BiLoaderAlt size={17} className="animate-spin" /></div>}>
            {`/shots/${params.order}`}
            {/* <Chunker order={params.order} countPrefix='/shots/allShotsCount/' shotsPrefix='/shots/v2/chunkedAllShots/' /> */}
        </Suspense>
    )
}

export default ShotsByOrder