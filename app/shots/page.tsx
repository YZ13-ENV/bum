import Chunker from '@/components/widgets/ChunkModule/Chunker'
import { Suspense } from 'react'
import Loading from './loading'

export default function ShotsPage() {
    return (
        <Suspense fallback={<Loading />}>
            <Chunker countPrefix={`/shots/count/popular/`} shotsPrefix={`/shots/all/popular/`} />
        </Suspense>
    )
}