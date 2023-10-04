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
const getShotsByTag = async(tag: string, order: string): Promise<DocShotData[]> => {
    try {
        const fetchUrl = `${getHost()}/tags/${tag}/${order}`
        const res = await fetch(fetchUrl, { method: 'GET', next: { revalidate: 1800 } })
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
    const shots = await getShotsByTag(params.tag, params.order)
    return (
        <Shots shots={shots} />
    )
}

export default TagPage