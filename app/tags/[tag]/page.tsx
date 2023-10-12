import { getShotsByTag } from '@/app/fetchers'
import Shots from '@/components/shared/Shots'

type Props = {
    params: {
        tag: string
    }
}
const TagsPage = async({ params }: Props) => {
    const shots = await getShotsByTag(params.tag, 'popular')
    return (
        <Shots shots={shots} />
    )
}

export default TagsPage