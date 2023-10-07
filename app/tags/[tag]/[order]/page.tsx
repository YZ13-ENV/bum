import dynamic from 'next/dynamic'
import { getShotsByTag } from '@/app/fetchers'
const Shots = dynamic(() => import('@/components/shared/Shots')) 

type Props = {
    params: {
        tag: string
        order: string
    }
}

const TagPage = async({ params }: Props) => {
    const shots = await getShotsByTag(params.tag, params.order)
    return (
        <Shots shots={shots} />
    )
}

export default TagPage