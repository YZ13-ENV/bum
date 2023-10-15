import { generateChunks } from '@/helpers/generateChunks'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import ChunkController from './ui/ChunkController'
import Loader from './ui/Loader'

const getCountOfShots = async(countPrefix: string) => {
    try {
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
const getFirstChunk = async(shotsPrefix: string) => {
    try {
        const res = await fetch(`${getHost()}${shotsPrefix}?skip=0`, {
            next: { revalidate: 3600 }
        })
        if (res.ok) {
            const data: DocShotData[] = await res.json()
            return data
        } else {
            return null
        }
    } catch(e) {
        return null
    }
}
type Props = {
    countPrefix: string
    shotsPrefix: string
}
const Chunker = async({ countPrefix, shotsPrefix }: Props) => {
    const count = await getCountOfShots(countPrefix)
    const firstChunk = await getFirstChunk(shotsPrefix)
    const chunksCount = count <= 16 ? 0 : Math.ceil((count - 1) / 16)
    const chunks = generateChunks(chunksCount, shotsPrefix)
    return (
        <section id='shots-wrapper' className='grid min-h-fit home_grid gap-9'>
            <Suspense fallback={<Loader />}>
                <ChunkController initialChunk={firstChunk} chunks={chunks} lastChunk={chunksCount} />
            </Suspense>
        </section>
    )
}

export default Chunker