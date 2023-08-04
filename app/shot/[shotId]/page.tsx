import ImageBlock from '@/components/entities/Blocks/ViewBlocks/ImageBlock'
import ShotPageLoader from '@/components/pages/ShotPageLoader'
import ShotPageToolBar from '@/components/widgets/ShotPageToolBar'
import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import { ShotData } from '@/types'
import { Button } from 'antd'
import React from 'react'
import { BiBookmark, BiHeart, BiSolidHeart } from 'react-icons/bi'
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
                <div className="flex items-center justify-between w-full max-w-2xl gap-1 mx-auto h-fit">
                    <div className="flex items-center w-full gap-2 h-fit">
                        <div className="border rounded-full w-14 h-14 shrink-0 bg-neutral-800 border-neutral-700" />
                        <div className="flex flex-col w-full h-full gap-1">
                            <span className='text-2xl font-semibold text-neutral-200'>{shot.title}</span>
                            <span className='w-1/2 h-4 rounded-xl bg-neutral-800'></span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Button className='!p-2 !h-fit'><BiHeart size={23} /></Button>
                        <Button className='!p-2 !h-fit'><BiBookmark size={23} /></Button>
                    </div>
                </div>
                <div className="w-full h-[32rem] shrink-0">
                    <BlockImage imageLink={shot.rootBlock.link} />
                </div>
                {
                    shot.blocks.map((block, index) => {
                        if (block.type === 'image') {
                            return <ImageBlock key={`block#${index}`} block={block} />
                        }
                        return null
                    })
                }
            </div>
            <ShotPageToolBar />
        </div>
    )
}

export default ShotPage