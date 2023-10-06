import Chunker from "@/components/widgets/ChunkModule/Chunker"
import { Suspense } from "react"
import Loading from "../../loading"

type Props = {
    params: {
        order: string
        category: string
    }
}
const ShotsByCategoryPage = ({ params }: Props) => {
    return (
        <Suspense fallback={<Loading />}>
            <Chunker countPrefix={`/shots/count/${params.order}/${params.category}`} shotsPrefix={`/shots/all/${params.order}/${params.category}`} />
        </Suspense>
    )
}

export default ShotsByCategoryPage