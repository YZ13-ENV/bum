import Chunker from '@/components/widgets/ChunkModule/Chunker'
import React, { Suspense } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {
    params: {
        order: string
    }
}
const ShotsByOrder = ({ params }: Props) => {
    const isRecommendation = params.order === 'recommendations'
    return (
        <Suspense fallback={<div className="flex items-center justify-center w-full h-full shot_wrapper"><BiLoaderAlt size={17} className="animate-spin" /></div>}>
            <Chunker order={isRecommendation ? 'popular' : params.order} 
            countPrefix={isRecommendation ? '/shots/v2/chunkWithRecommendationsCount/' : '/shots/allShotsCount/'} 
            shotsPrefix={isRecommendation ? '/shots/v2/chunkWithRecommendations/' : '/shots/v2/chunkedAllShots/'} />
        </Suspense>
    )
}

export default ShotsByOrder