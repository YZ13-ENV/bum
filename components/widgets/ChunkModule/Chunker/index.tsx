import { generateChunks } from '@/helpers/generateChunks'
import { getHost } from '@/helpers/getHost'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
const Chunk = dynamic(() => import('./ui/Chunk'))

const getCountOfShots = async(countPrefix: string) => {
    try {
        // const cookiesList = cookies()
        // const uid = cookiesList.get('uid')
        const link = `${getHost()}${countPrefix}`
        const res = await fetch(link, {
            method: "GET",
            next: { revalidate: 3600 }
        })
        if (res.ok) {
            const count = parseInt(await res.json())
            return count
        } else return 0
    } catch(e) {
        return 0
    }

}
type Props = {
    countPrefix: string
    shotsPrefix: string
    // order: string
}
const Chunker = async({ countPrefix, shotsPrefix }: Props) => {
    const cookiesList = cookies()
    const uid = cookiesList.get('uid')
    const count = await getCountOfShots(countPrefix)
    const chunksCount = count <= 16 ? 1: Math.ceil(count / 16)
    const chunks = generateChunks(chunksCount, shotsPrefix)
    // ?  : generateChunks(chunksCount, order, shotsPrefix)
    return (
        <section id='shots-wrapper' className='flex flex-col gap-9'>
        {
            chunks.map((chunk, index) => <Chunk index={index} chunkLink={chunk} key={chunk}/>)
        }
        </section>
    )
}

export default Chunker