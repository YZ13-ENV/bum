import ImageLoader from '@/components/shared/ui/Loaders/ImageLoader'
import TextLoader from '@/components/shared/ui/Loaders/TextLoader'
import UserSectionLoader from '@/components/shared/ui/Loaders/ShotPage/UserSectionLoader'
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
    shot: DocShotData | null
    user: ShortUserData | null
    userId: string
}
const ShotPage = ({ shot, user, userId }: Props) => {
    if (!shot) return null
    if (!user) return null
    return (
        <>
            <div className="flex flex-col w-full max-w-4xl gap-8 mx-auto h-fit shrink-0">
                <ShotUserSection isSubscriber={user.isSubscriber} shot={shot} title={shot.title} userId={userId}
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