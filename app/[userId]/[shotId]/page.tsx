import ImageLoader from '@/components/shared/ui/Loaders/ImageLoader'
import TextLoader from '@/components/shared/ui/Loaders/TextLoader'
import UserSectionLoader from '@/components/shared/ui/Loaders/ShotPage/UserSectionLoader'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import { Metadata } from 'next'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { BiChevronRight } from 'react-icons/bi'
import ShotActions from '@/components/entities/shot/ui/ShotActions'
import CommentSection from '@/components/widgets/CommentSection'
const LastWorks = dynamic(() => import('@/components/widgets/LastWorks'))
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

            {/* <div className="flex items-center justify-center w-full max-w-2xl h-fit"></div> */}
            <div className="flex md:flex-row flex-col items-start w-full max-w-4xl gap-2 mx-auto h-fit min-h-[24rem]">
                <div className="flex flex-col w-full h-full gap-2 md:w-8/12">
                    <div className="flex flex-col w-full gap-2 p-2 h-fit rounded-xl bg-neutral-900">
                        <div className="flex items-center justify-between w-full h-fit">
                            <div className="flex items-center gap-2 w-fit h-fit">
                                <span className='text-sm text-neutral-300'>{shot.views.length} просмотров</span>
                                <span className='text-sm text-neutral-300'>{DateTime.fromSeconds(shot.createdAt).setLocale('ru').toLocaleString(DateTime.DATE_MED)}</span>
                            </div>
                            <div className="flex items-center w-fit h-fit">
                                <ShotActions shot={shot} isOnPage />
                            </div>
                        </div>
                        <div className="inline-flex flex-wrap w-full gap-1 h-fit">
                            {
                                shot.tags.map((tag, index) => <span key={tag + index} 
                                    className='px-2 py-0.5 text-xs rounded-full border border-neutral-700 text-neutral-300 bg-neutral-800'>{tag}</span>
                                )
                            }
                        </div>
                    </div>
                    <CommentSection shot={shot} />

                </div>
                <div className="flex flex-col w-full h-full gap-2 md:w-4/12">
                    <Link href={`/${shot.authorId}`} className="flex items-center justify-between w-full h-fit">
                        <span className='text-sm line-clamp-1 text-neutral-400'>Больше от <span className='font-semibold text-neutral-200'>{user.displayName}</span></span>
                        <BiChevronRight size={17} />
                    </Link>
                    <LastWorks displayName={user?.displayName as string | null} userId={params.userId} />
                </div>
            </div>

        </div>
        </Suspense>
    )
}

export default ShotPage