import Chunker from '@/components/widgets/ChunkModule/Chunker'

type Props = {
    params: {
        order: string
    }
}
const ShotsByOrder = ({ params }: Props) => {
    // const isRecommendation = params.order === 'recommendations'
    return (
        <Chunker countPrefix={`/shots/count/${params.order}/`} shotsPrefix={`/shots/all/${params.order}/`} />
    )
}

export default ShotsByOrder