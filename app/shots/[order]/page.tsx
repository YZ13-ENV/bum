import Chunker from '@/components/widgets/ChunkModule/Chunker'

type Props = {
    params: {
        order: string
    }
}
const ShotsByOrder = ({ params }: Props) => {
    const isRecommendation = params.order === 'recommendations'
    return (
        <Chunker order={isRecommendation ? 'popular' : params.order} 
        countPrefix={isRecommendation ? '/shots/v2/chunkWithRecommendationsCount/' : '/shots/allShotsCount/'} 
        shotsPrefix={isRecommendation ? '/shots/v2/chunkWithRecommendations/' : '/shots/v2/chunkedAllShots/'} />
    )
}

export default ShotsByOrder