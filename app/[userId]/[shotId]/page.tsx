import ImageLoader from '@/components/shared/ui/Loaders/ImageLoader'
import TextLoader from '@/components/shared/ui/Loaders/TextLoader'
import UserSectionLoader from '@/components/shared/ui/Loaders/ShotPage/UserSectionLoader'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import dynamic from 'next/dynamic'
import React from 'react'
import { Metadata } from 'next'
const LastWorks = dynamic(() => import('@/components/widgets/LastWorks'))
const TextBlock = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/TextBlock'), {
    loading: () => <TextLoader />
})
const MediaBlock = dynamic(() => import('@/components/entities/Blocks/MediaBlock'), {
    loading: () => <ImageLoader />
}) 
const ShotUserSection = dynamic(() => import('@/components/widgets/ShotUserSection'), {
    loading: () => <UserSectionLoader />
}) 
type Props = {
    params: {
        shotId: string
        userId: string
    }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 
    try {
        const shotRes = await fetch(`${getHost()}/shots/shot?userId=${params.userId}&shotId=${params.shotId}`)
        const shot: DocShotData = await shotRes.json()

        return {
            title: shot.title
        }
    } catch(e) {
        return {
            title: 'Ошибка'
        }
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
                <ShotUserSection shot={data.shot} title={data.shot.title} userId={params.userId}
                displayName={data.user?.displayName as string | null} photoUrl={data.user?.photoUrl as string | null} />
                <MediaBlock {...data.shot.rootBlock} server autoPlay />
                {
                    data.shot.blocks.map((block, index) => {
                        if (block.type === 'image') {
                            return <MediaBlock key={`block#${index}`} {...block} server />
                        }
                        if (block.type === 'text') {
                            return <TextBlock key={`block#${index}`} block={block} />
                        }
                        return null
                    })
                }
            </div>
            <LastWorks displayName={data.user?.displayName as string | null} userId={params.userId} />
        </div>
    )
}

export default ShotPage