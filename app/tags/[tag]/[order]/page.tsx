import dynamic from 'next/dynamic'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
const Shots = dynamic(() => import('@/components/shared/Shots')) 

type Props = {
    params: {
        tag: string
        order: string
    }
}
const getShotByTag = async(tag: string): Promise<DocShotData[]> => {
    try {
        const fetchUrl = `${getHost()}/tags/${tag}`
        const res = await fetch(fetchUrl)
        if (res.ok) {
            const shots: DocShotData[] = await res.json()
            return shots
        } else return []
    } catch(e) {
        console.log(e)
        return []
    }
}
const TagPage = async({ params }: Props) => {
    const shots = await getShotByTag(params.tag)
    return (
        <Shots shots={shots} />
    )
}

export default TagPage