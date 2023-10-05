import { generateChunks } from '@/helpers/generateChunks'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import dynamic from 'next/dynamic'
import ChunkWrapper from './ui/ChunkWrapper'
import { Suspense } from 'react'
// import { cookies } from 'next/headers'
const Chunk = dynamic(() => import('./ui/Chunk'))
const ShotCard = dynamic(() => import('@/components/entities/shot'))

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
    // order: string
}
const Chunker = async({ countPrefix, shotsPrefix }: Props) => {
    // const cookiesList = cookies()
    // const uid = cookiesList.get('uid')
    const count = await getCountOfShots(countPrefix)
    const firstChunk = await getFirstChunk(shotsPrefix)
    const chunksCount = count <= 16 ? 0: Math.ceil((count - 1) / 16)
    const chunks = generateChunks(chunksCount, shotsPrefix)
    // ?  : generateChunks(chunksCount, order, shotsPrefix)
    return (
        <section id='shots-wrapper' className='flex flex-col gap-9'>
        <ChunkWrapper predictedValue={true}>
            {
                firstChunk && firstChunk.map((shotChunk, index) => 
                    <Suspense key={`${shotChunk.doc_id}#${index}#shot#${index + 1}`} 
                    fallback={<div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse'/>}>
                        <ShotCard shot={shotChunk}  />
                    </Suspense>
                )
            }
        </ChunkWrapper>
        {
            chunks.map((chunk, index) => <Chunk index={index} chunkLink={chunk} key={chunk}/>)
        }
        </section>
    )
}

export default Chunker