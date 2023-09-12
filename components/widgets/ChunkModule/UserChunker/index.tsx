import { generateUserChunks } from '@/helpers/generateChunks'
import { getHost } from '@/helpers/getHost'
import Chunk from '../Chunker/ui/Chunk'

const getCountOfShots = async(userId: string) => {
    try {
        const res = await fetch(`${getHost()}/shots/userShotsCount/${userId}`, {
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
    userId: string
}
const UserChunker = async({ userId }: Props) => {
    const count = await getCountOfShots(userId)
    const chunksCount = count <= 16 ? 1: Math.ceil(count / 16)
    const chunks = generateUserChunks(userId, chunksCount, 'popular')
    return (
        <section className='flex flex-col gap-9'>
            {
                chunks.map((chunk, index) => <Chunk index={index} chunkLink={chunk} key={chunk}/>)
            }
        </section>
    )
}

export default UserChunker