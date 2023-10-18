'use client'
import dynamic from 'next/dynamic'
import { DocShotData } from '@/types'
import { memo, useState } from 'react'
import { Button } from 'antd'
const ShotCard = dynamic(() => import('@/components/entities/shot'))

type Props = {
    chunks: string[]
    lastChunk: number
}
const fetchChunk = async(link: string) => {
    try {
        const res = await fetch(link, {
            next: { revalidate: 120 }
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
const ChunkController = ({ chunks, lastChunk }: Props) => {
    const [items, setItems] = useState<DocShotData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const loadChunk = async() => {
        setLoading(true)
        const chunkLink = chunks[currentIndex]
        if (chunkLink) {
            const fetchedChunk = await fetchChunk(chunkLink)
            setLoading(false)
            setCurrentIndex(currentIndex + 1)
            if (fetchedChunk) setItems([ ...items, ...fetchedChunk ])
        } else setLoading(false)
    }
    return (
        <>
            {/* { initialChunk && initialChunk.map(item => <ShotCard key={item.doc_id} shot={item} />) } */}
            { items.map(item => <ShotCard key={item.doc_id} shot={item} />) }
            <div className="flex items-center justify-center w-full col-span-full h-fit">
                {
                    chunks.length === 0
                    ? null
                    : (lastChunk - 1) === currentIndex
                    ? <span className='text-sm text-neutral-400'>Вы дошли до конца списка</span>
                    : <Button disabled={(lastChunk - 1) === currentIndex} onClick={loadChunk} loading={loading}>Загрузить ещё</Button>
                }
            </div>
        </>
        
    )
}

export default memo(ChunkController)