import ImageLoader from '@/components/shared/ui/Loaders/ImageLoader'
import TextLoader from '@/components/shared/ui/Loaders/TextLoader'
import UserSectionLoader from '@/components/shared/ui/Loaders/ShotPage/UserSectionLoader'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
const TextBlock = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/TextBlock'), {
    loading: () => <TextLoader />
})
const MediaBlock = dynamic(() => import('@/components/entities/Blocks/MediaBlock'), {
    loading: () => <ImageLoader />
}) 
const ShotUserSection = dynamic(() => import('@/components/shared/ui/ShotUserSection'), {
    loading: () => <UserSectionLoader />
}) 
type Props = {
    params: {
        shotId: string
        userId: string
    }
}
const getShot = async(userId: string, shotId: string) => {
    try {
        const shotRes = await fetch(`${getHost()}/shots/shot?userId=${userId}&shotId=${shotId}`)
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET' })
        const shot: DocShotData = await shotRes.json()
        const user: { short: ShortUserData } | null = await userRes.json()
        return { shot: shot, user: user ? user.short : null }
    } catch(e) {
        console.log(e)
        return null
    }
}
const ShotPage = async({ params }: Props) => {
    const data = await getShot(params.userId, params.shotId)
    if (!data) return null
    return (
        <div className='relative flex flex-col w-full min-h-full gap-6 px-4 pb-4 md:px-0 h-fit'>
            {/* <ShotPageLoader /> */}
            <div className="flex flex-col w-full max-w-4xl gap-4 mx-auto h-fit shrink-0">
                <ShotUserSection title={data.shot.title} userId={params.userId}
                displayName={data.user?.displayName as string | null} photoUrl={data.user?.photoUrl as string | null} />
                <MediaBlock {...data.shot.rootBlock} />
                {
                    data.shot.blocks.map((block, index) => {
                        if (block.type === 'image') {
                            return <MediaBlock key={`block#${index}`} {...data.shot.rootBlock} />
                        }
                        if (block.type === 'text') {
                            return <TextBlock key={`block#${index}`} block={block} />
                        }
                        return null
                    })
                }
            </div>
            <div className="flex flex-col justify-between w-full h-64 max-w-6xl gap-4 p-3 mx-auto mt-auto shrink-0 rounded-xl bg-neutral-800">
                <div className="flex items-center justify-between w-full h-fit">
                    <span className='font-semibold text-neutral-200'>Больше от {data.user?.displayName || 'Пользователь'}</span>
                    <Link className='inline-flex items-center gap-1 text-sm text-neutral-300' href={`/${params.userId}`}>Посмотреть все <BiChevronRight size={15} /></Link>
                </div>
                <div className="w-full h-full overflow-y-auto snap-y snap-mandatory snap-always">
                    <div className="grid w-full grid-cols-1 grid-rows-4 gap-2 md:h-48 sm:h-[24rem] h-[48rem] md:grid-cols-4 sm:grid-cols-2 md:grid-rows-1 sm:grid-rows-2 shrink-0">
                        <div className="w-full h-full snap-center rounded-xl bg-neutral-700"></div>
                        <div className="w-full h-full snap-center rounded-xl bg-neutral-700"></div>
                        <div className="w-full h-full snap-center rounded-xl bg-neutral-700"></div>
                        <div className="w-full h-full snap-center rounded-xl bg-neutral-700"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShotPage