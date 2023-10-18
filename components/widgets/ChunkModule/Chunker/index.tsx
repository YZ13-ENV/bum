import { generateChunks } from '@/helpers/generateChunks'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import ChunkController from './ui/ChunkController'
import { Button } from 'antd'
import dynamic from 'next/dynamic'
const ShotCard = dynamic(() => import('@/components/entities/shot'))


const getCountOfShots = async(countPrefix: string) => {
    try {
        const link = `${getHost()}${countPrefix}`
        const res = await fetch(link, {
            method: "GET",
            next: { revalidate: 120 }
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
type Props = {
    countPrefix: string
    shotsPrefix: string
}
const Chunker = async({ countPrefix, shotsPrefix }: Props) => {
    const count = await getCountOfShots(countPrefix)
    const firstChunk = await getFirstChunk(shotsPrefix)
    const chunksCount = count <= 16 ? 0 : Math.ceil((count - 1) / 16)
    const chunks = generateChunks(chunksCount, shotsPrefix)
    if (count === 0) return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-4 col-span-full shot_wrapper'>
            <span className='text-sm text-neutral-200'>Нет работ, вы можете быть первым</span>
            <Button href='/uploads/shot'>Загрузить работу</Button>
        </div>
    )
    return (
        <>
            { firstChunk && firstChunk.map(item => <ShotCard key={item.doc_id} shot={item} />) }
            <ChunkController chunks={chunks} lastChunk={chunksCount} />
        </>
    )
}

export default Chunker