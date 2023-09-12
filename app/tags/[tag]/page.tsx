import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import dynamic from 'next/dynamic'
const Shots = dynamic(() => import('@/components/shared/Shots')) 
const Tabs = dynamic(() => import('@/components/widgets/Tabs')) 

type Props = {
    params: {
        tag: string
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
        <section className='flex flex-col w-full h-full p-4 md:py-4 md:px-12'>
            <Tabs />
            <Shots shots={shots} />
        </section>
    )
}

export default TagPage