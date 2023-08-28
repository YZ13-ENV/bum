import ShotCard from '@/components/entities/shot'
import { DocShotData } from '@/types'
import React, { Suspense } from 'react'
import ChunkWrapper from './ChunkWrapper'

type Props = {
    chunkLink: string
    index: number
}
const fetchChunk = async(link: string) => {
    try {
        const res = await fetch(link)
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
const Chunk = async({ chunkLink, index }: Props) => {
    const dataChunk = await fetchChunk(chunkLink)
    if (index === 0) {
        return (
            <ChunkWrapper predictedValue={true}>
                {
                    dataChunk && dataChunk.map((shotChunk, index) => 
                        <Suspense key={`${shotChunk.doc_id}#${index}#shot#${index + 1}`} 
                        fallback={<div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse'/>}>
                            <ShotCard shot={shotChunk} />
                        </Suspense>
                    )
                }
            </ChunkWrapper>
        )
    }
    return (
        <ChunkWrapper>
            {
                dataChunk && dataChunk.map((shotChunk, index) => 
                    <Suspense key={`${shotChunk.doc_id}#${index}#shot#${index + 1}`} 
                    fallback={<div className='w-full h-full rounded-xl bg-neutral-900 animate-pulse'/>}>
                        <ShotCard shot={shotChunk} />
                    </Suspense>
                )
            }
        </ChunkWrapper>
    )
}

export default Chunk