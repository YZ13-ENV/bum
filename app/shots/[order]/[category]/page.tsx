import Chunker from "@/components/widgets/ChunkModule/Chunker"
import { Suspense } from "react"
import { BiLoaderAlt } from "react-icons/bi"

type Props = {
    params: {
        order: string
        category: string
    }
}
const ShotsByCategoryPage = ({ params }: Props) => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center w-full h-full shot_wrapper"><BiLoaderAlt size={17} className="animate-spin" /></div>}>
            {/* {`/shots/${params.order}`} */}
            <Chunker order={`${params.category}/${params.order}`} countPrefix='/shots/v2/chunkByCategoriesCount/' shotsPrefix='/shots/v2/chunkByCategories/' />
        </Suspense>
    )
}

export default ShotsByCategoryPage