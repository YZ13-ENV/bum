import { generateChunks } from '@/helpers/generateChunks'
import { getHost } from '@/helpers/getHost'
import dynamic from 'next/dynamic'
const Chunk = dynamic(() => import('./ui/Chunk'))

const getCountOfShots = async() => {
    try {
        const res = await fetch(`${getHost()}/shots/allShotsCount`, {
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
    order: string
}
const Chunker = async({ order='popular' }: Props) => {
    const count = await getCountOfShots()
    const chunksCount = count <= 16 ? 1: Math.ceil(count / 16)
    const chunks = generateChunks(chunksCount, order)
    return (
        <section id='shots-wrapper' className='flex flex-col gap-9'>
        {
            chunks.map((chunk, index) => <Chunk index={index} chunkLink={chunk} key={chunk}/>)
        }
        </section>
    )
}

export default Chunker