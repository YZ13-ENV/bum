import Chunker from "@/components/widgets/ChunkModule/Chunker"

type Props = {
    params: {
        order: string
        category: string
    }
}
const ShotsByCategoryPage = ({ params }: Props) => {
    return (
        <Chunker countPrefix={`/shots/count/${params.order}/${params.category}`} shotsPrefix={`/shots/all/${params.order}/${params.category}`} />
    )
}

export default ShotsByCategoryPage