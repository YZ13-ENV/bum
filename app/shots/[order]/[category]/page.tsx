
type Props = {
    params: {
        order: string
        category: string
    }
}
const ShotsByCategoryPage = ({ params }: Props) => {
    return `/shots/${params.order}/${params.category}`
}

export default ShotsByCategoryPage