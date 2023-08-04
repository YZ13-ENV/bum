import ImageBlock from '@/components/entities/Blocks/ViewBlocks/ImageBlock'
import TextBlock from '@/components/entities/Blocks/ViewBlocks/TextBlock'
import ShotPageLoader from '@/components/pages/ShotPageLoader'
import ShotPageToolBar from '@/components/widgets/ShotPageToolBar'
import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiBookmark, BiChevronRight, BiHeart, BiSolidHeart, BiUser } from 'react-icons/bi'
type Props = {
    params: {
        shotId: string
        userId: string
    }
}
const getShot = async(userId: string, shotId: string) => {
    try {
        const shotRes = await fetch(`${getHost()}/api/shots/shot?userId=${userId}&shotId=${shotId}`)
        const userRes = await fetch(`${getHost()}/api/user/short?userId=${userId}`, { method: 'GET' })
        const shot: DocShotData = await shotRes.json()
        const user: ShortUserData | null = await userRes.json()
        return { shot: shot, user: user }
    } catch(e) {
        console.log(e)
        return null
    }
}
const ShotPage = async({ params }: Props) => {
    const data = await getShot(params.userId, params.shotId)
    if (!data) return null
    return (
        <div className='relative flex flex-col w-full min-h-full gap-6 h-fit'>
            {/* <ShotPageLoader /> */}
            <div className="flex flex-col w-full max-w-4xl gap-4 mx-auto h-fit shrink-0">
                <div className="flex items-center justify-between w-full max-w-2xl gap-1 mx-auto h-fit">
                    <div className="flex items-center w-full gap-4 h-fit">
                        <Link href={`/${params.userId}`}>
                            {
                                data.user 
                                ? data.user.photoUrl
                                ? <Image className='rounded-full shrink-0' src={data.user.photoUrl} width={56} height={56} alt='user-photo' />
                                : <div className="flex items-center justify-center border rounded-full w-14 h-14 shrink-0 bg-neutral-800 border-neutral-700">
                                    <BiUser size={17} />
                                </div>
                                : <div className="border rounded-full w-14 h-14 shrink-0 bg-neutral-800 border-neutral-700" />
                            }
                        </Link>
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
                        if (block.type === 'text') {
                            return <TextBlock key={`block#${index}`} block={block} />
                        }
                        return null
                    })
                }
            </div>
            <div className="flex flex-col w-full h-64 max-w-6xl gap-4 p-3 mx-auto mt-auto shrink-0 rounded-xl bg-neutral-800">
                <div className="flex items-center justify-between w-full h-fit">
                    <span className='font-semibold text-neutral-200'>Больше от {data.user?.displayName || 'Пользователь'}</span>
                    <Link className='inline-flex items-center gap-1 text-sm text-neutral-300' href={`/${params.userId}`}>Посмотреть все <BiChevronRight size={15} /></Link>
                </div>
                <div className="grid w-full h-full grid-cols-4 grid-rows-1 gap-2">
                    <div className="w-full h-full rounded-xl bg-neutral-700"></div>
                    <div className="w-full h-full rounded-xl bg-neutral-700"></div>
                    <div className="w-full h-full rounded-xl bg-neutral-700"></div>
                    <div className="w-full h-full rounded-xl bg-neutral-700"></div>
                </div>
            </div>
            <div className="flex w-full p-16 h-fit shrink-0 rounded-t-xl bg-neutral-800">
                <div className="flex flex-col w-full h-full max-w-sm gap-2">
                    <div className="flex items-center w-full gap-2 h-fit">
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <Image src='/DarkMaterial.svg' width={36} height={36} alt='root-logo' />
                            <span className='text-2xl font-bold text-neutral-200'>Dark Material</span>
                        </div>
                        <div className="w-0.5 h-full bg-neutral-700" />
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <Image src='/DM_DesignV2.svg' width={36} height={36} alt='root-logo' />
                            <span className='text-2xl font-bold text-neutral-200'>Dey</span>
                        </div>
                    </div>
                    <div className="w-full h-fit">
                        <span className='text-sm text-neutral-300'>Dey - приложение для объединения и вдохновения людей</span>
                    </div>
                </div>
            </div>
            {
                <ShotPageToolBar userId={params.userId} shot={data.shot} user={data.user} />
            }
        </div>
    )
}

export default ShotPage