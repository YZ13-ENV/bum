import { redirect } from 'next/navigation'

type Props = {
    params: {
        tag: string
    }
}
const TagsPage = ({ params }: Props) => {
    return redirect(`/tags/${params.tag}/popular`)
}

export default TagsPage