import ShotPageLoader from '@/components/pages/ShotPageLoader'
import ShotList from '@/components/widgets/ShotList'
import { ShotData } from '@/types'
import React from 'react'
type Props = {
    params: {
        shotId: string
    }
}
const getShots = async() => {
    try {
        const res = await fetch(`/api/shots/shotsList?userId=GeCmAPxiDMaCeJt1EWOclUfULR83`)
        const list: ShotData[] = await res.json()
        return list
    } catch(e) {
        console.log(e)
        return []
    }
}
const ShotPage = async({ params }: Props) => {
    const shots = await getShots()
    return (
        <div className='relative w-full h-full'>
            <ShotPageLoader />
            <div className="flex flex-col w-full h-full max-w-6xl gap-4 mx-auto shrink-0">
                <ShotList />
                {params.shotId}
                {JSON.stringify(shots, null, 2)}
            </div>
        </div>
    )
}

export default ShotPage