import Chunker from '@/components/widgets/ChunkModule/Chunker'
import { Suspense } from 'react'
import Loading from '../loading'

type Props = {
    params: {
        order: string
    }
}
const ShotsByOrder = ({ params }: Props) => {
    // const isRecommendation = params.order === 'recommendations'
    return (
        <Suspense fallback={<Loading />}>
            <Chunker countPrefix={`/shots/count/${params.order}/`} shotsPrefix={`/shots/all/${params.order}/`} />
        </Suspense>
    )
}

export default ShotsByOrder