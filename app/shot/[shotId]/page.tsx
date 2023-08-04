import ImageBlock from '@/components/entities/Blocks/ViewBlocks/ImageBlock'
import ShotPageLoader from '@/components/pages/ShotPageLoader'
import ShotPageToolBar from '@/components/widgets/ShotPageToolBar'
import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'
import { BiBookmark, BiHeart, BiSolidHeart, BiUser } from 'react-icons/bi'
type Props = {
    params: {
        shotId: string
    }
}
const getShot = async(param: string) => {
    const parsedParam = param.split('-')
    try {
        const shotRes = await fetch(`${getHost()}/api/shots/shot?userId=${parsedParam[0]}&shotId=${parsedParam[1]}`)
        const userRes = await fetch(`${getHost()}/api/user/short?userId=${parsedParam[0]}`, { method: 'GET' })
        const shot: DocShotData = await shotRes.json()
        const user: ShortUserData | null = await userRes.json()
        return { shot: shot, user: user }
    } catch(e) {
        console.log(e)
        return null
    }
}
const ShotPage = async({ params }: Props) => {
    const data = await getShot(params.shotId)
    if (!data) return null
    return (
        <div className='relative flex flex-col w-full h-full gap-6'>
            <ShotPageLoader />
            <div className="flex flex-col w-full max-w-4xl gap-4 mx-auto h-fit shrink-0">
                <div className="flex items-center justify-between w-full max-w-2xl gap-1 mx-auto h-fit">
                    <div className="flex items-center w-full gap-4 h-fit">
                        {
                            data.user 
                            ? data.user.photoUrl
                            ? <Image className='rounded-full shrink-0' src={data.user.photoUrl} width={56} height={56} alt='user-photo' />
                            : <div className="flex items-center justify-center border rounded-full w-14 h-14 shrink-0 bg-neutral-800 border-neutral-700">
                                <BiUser size={17} />
                            </div>
                            : <div className="border rounded-full w-14 h-14 shrink-0 bg-neutral-800 border-neutral-700" />
                        }
                        <div className="flex flex-col w-full h-full gap-1">
                            <span className='text-2xl font-semibold text-neutral-200'>{data.shot.title}</span>
                            <span className='text-xs text-neutral-400'>{data.user?.displayName || 'Пользователь'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Button className='!p-2 !h-fit'><BiHeart size={23} /></Button>
                        <Button className='!p-2 !h-fit'><BiBookmark size={23} /></Button>
                    </div>
                </div>
                <div className="w-full h-[32rem] shrink-0">
                    <BlockImage imageLink={data.shot.rootBlock.link} />
                </div>
                {
                    data.shot.blocks.map((block, index) => {
                        if (block.type === 'image') {
                            return <ImageBlock key={`block#${index}`} block={block} />
                        }
                        return null
                    })
                }
            </div>
            <div className="flex flex-col w-full h-64 max-w-6xl gap-4 mx-auto mt-auto shrink-0 bg-neutral-800">

            </div>
            <div className="flex w-full p-16 h-96 shrink-0 bg-neutral-800">
                <div className="w-full h-full max-w-sm bg-neutral-700"></div>
            </div>
            {
                <ShotPageToolBar shot={data.shot} user={data.user} />
            }
        </div>
    )
}

export default ShotPage