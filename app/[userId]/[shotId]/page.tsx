import ImageLoader from '@/components/shared/ui/Loaders/ImageLoader'
import TextLoader from '@/components/shared/ui/Loaders/TextLoader'
import UserSectionLoader from '@/components/shared/ui/Loaders/ShotPage/UserSectionLoader'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
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
        const shotRes = await fetch(`${getHost()}/shots/shot?userId=${params.userId}&shotId=${params.shotId}`, { method: 'GET', cache: 'no-cache' })
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
const getUser = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', cache: 'no-cache' })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        return null
    }
}
const getShot = async(userId: string, shotId: string) => {
    try {
        const shotRes = await fetch(`${getHost()}/shots/shot?userId=${userId}&shotId=${shotId}`, { method: 'GET', cache: 'no-cache' })
        const shot: DocShotData = await shotRes.json()
        return shot
    } catch(e) {
        console.log(e)
        return null
    }
}
const ShotPage = async({ params }: Props) => {
    const shot = await getShot(params.userId, params.shotId)
    const user = await getUser(params.userId)
    if (!shot) return null
    if (!user) return null
    return (
        <Suspense fallback={<span>...loading...</span>}>
        <div className='relative flex flex-col w-full min-h-full gap-6 px-4 pb-4 md:px-0 h-fit'>
            {/* <ShotPageLoader /> */}
            <div className="flex flex-col w-full max-w-4xl gap-4 mx-auto h-fit shrink-0">
                <ShotUserSection shot={shot} title={shot.title} userId={params.userId}
                displayName={user?.displayName as string | null} photoUrl={user?.photoUrl as string | null} />
                <Suspense fallback={<ImageLoader />}>
                    <MediaBlock {...shot.rootBlock} server autoPlay />
                </Suspense>
                {
                    shot.blocks.map((block, index) => {
                        if (block.type === 'image') {
                            return (
                                <Suspense key={`block#${index}`} fallback={<ImageLoader />}>
                                     <MediaBlock {...block} server />
                                </Suspense>
                            )
                        }
                        if (block.type === 'text') {
                            return <TextBlock key={`block#${index}`} block={block} />
                        }
                        return null
                    })
                }
            </div>

            {/* <div className="flex items-center justify-center w-full max-w-2xl h-fit"></div> */}
            <LastWorks displayName={user?.displayName as string | null} userId={params.userId} />
        </div>
        </Suspense>
    )
}

export default ShotPage