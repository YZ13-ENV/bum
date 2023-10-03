import Chunker from "@/components/widgets/ChunkModule/Chunker"

type Props = {
    params: {
        order: string
        category: string
    }
}
const ShotsByCategoryPage = ({ params }: Props) => {
    return (
        <Chunker order={`${params.category}/${params.order}`} countPrefix='/shots/v2/chunkByCategoriesCount/' shotsPrefix='/shots/v2/chunkByCategories/' />
    )
}

export default ShotsByCategoryPage