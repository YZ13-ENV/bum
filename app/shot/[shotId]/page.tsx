import ShotPageLoader from '@/components/pages/ShotPageLoader'
import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import { ShotData } from '@/types'
import React from 'react'
type Props = {
    params: {
        shotId: string
    }
}
const getShot = async(param: string) => {
    const parsedParam = param.split('-')
    try {
        const res = await fetch(`http://localhost:3000/api/shots/shot?userId=${parsedParam[0]}&shotId=${parsedParam[1]}`)
        const shot: ShotData = await res.json()
        return shot
    } catch(e) {
        console.log(e)
        return null
    }
}
const ShotPage = async({ params }: Props) => {
    const shot: ShotData | null = await getShot(params.shotId)
    if (!shot) return null
    return (
        <div className='relative w-full h-full'>
            <ShotPageLoader />
            <div className="flex flex-col w-full h-full max-w-4xl gap-4 mx-auto shrink-0">
                <span className='text-2xl font-semibold text-neutral-200'>{shot.title}</span>
                <div className="w-full h-[32rem]">
                    <BlockImage imageLink={shot.rootBlock.link} />
                </div>
            </div>
        </div>
    )
}

export default ShotPage