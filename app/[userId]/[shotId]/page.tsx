import ImageLoader from '@/components/shared/ui/Loaders/ImageLoader'
import TextLoader from '@/components/shared/ui/Loaders/TextLoader'
import UserSectionLoader from '@/components/shared/ui/Loaders/ShotPage/UserSectionLoader'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
const ConfettiForNewShot = dynamic(() => import('@/components/widgets/Confetti')) 
const ShotPageFooter = dynamic(() => import('@/components/widgets/ShotPageFooter')) 
const TextBlock = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/TextBlock'), {
    loading: () => <TextLoader />
})
const MediaBlock = dynamic(() => import('@/components/entities/Blocks/MediaBlock'), {
    loading: () => <div className='w-full h-96 rounded-xl bg-neutral-900' />
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

const getUser = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', cache: 'default' })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        return null
    }
}
const getShot = async(userId: string, shotId: string) => {
    try {
        const shotRes = await fetch(`${getHost()}/shots/shot?userId=${userId}&shotId=${shotId}`, { method: 'GET', cache: 'no-store' })
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
        <>
            <div className="flex flex-col w-full max-w-4xl gap-8 mx-auto h-fit shrink-0">
                <ShotUserSection shot={shot} title={shot.title} userId={params.userId}
                displayName={user?.displayName as string | null} photoUrl={user?.photoUrl as string | null} />
                <Suspense fallback={<div className='w-full h-96 rounded-xl bg-neutral-900' />}>
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
            <ConfettiForNewShot views={shot.views.length} />
            <ShotPageFooter shot={shot} />
        </>
    )
}

export default ShotPage