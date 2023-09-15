import dynamic from 'next/dynamic'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { fetchFile } from '@/helpers/fetchFile'
import { DateTime } from 'luxon'
const ImageLoader = dynamic(() => import('@/components/shared/Loaders/ImageLoader')) 
const TextLoader = dynamic(() => import('@/components/shared/Loaders/TextLoader')) 
const UserSectionLoader = dynamic(() => import('@/components/shared/Loaders/ShotPage/UserSectionLoader'))
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
        return redirect('')
    }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 
    try {
        const shot = await getShot(params.userId, params.shotId)
        const user = await getUser(params.userId)
        if (!shot || !user) return {}
        return {
            title: shot.title,
            description: `Работа от ${user.displayName}, вы можете посмотреть другие работы на Dey`,
            colorScheme: 'dark',
            creator: 'Dark Material Team',
            openGraph: {
                type: 'article',
                title: shot.title,
                description: `Работа - ${shot.title}`,
                images: fetchFile(shot.rootBlock.link),
                publishedTime: DateTime.fromSeconds(shot.createdAt).toISO() as string || undefined,
                siteName: 'Dey',
                tags: ['dey', 'dribbble', 'behance', 'drible', 'dribble']
            },
            robots: 'index, follow',
            themeColor: '#000000',
            twitter: {
                card: 'summary',
                images: fetchFile(shot.rootBlock.link),
                title: shot.title,
                description: `Работа - ${shot.title}`,
                site: `https://design.darkmaterial.space/${shot.authorId}/${shot.doc_id}`,
            },
            keywords: ['dey', 'dribbble', 'behance', 'drible', 'dribble']
        }
    } catch(e) {
        return {
            title: 'Ошибка'
        }
    }
}
const ShotPage = async({ params }: Props) => {
    const shot = await getShot(params.userId, params.shotId)
    const user = await getUser(params.userId)
    if (!shot) return null
    if (!user) return null
    return (
        <section className='relative flex flex-col w-full min-h-full px-2 gap-14 py-14 lg:px-0 h-fit'>
            <div className="flex flex-col w-full max-w-md mx-auto gap-14 md:max-w-4xl h-fit shrink-0">
                <ShotUserSection shot={shot} isSubscriber={user.isSubscriber} title={shot.title} userId={params.userId}
                displayName={user?.displayName as string | null} photoUrl={user?.photoUrl as string | null} />
                <Suspense fallback={<div className='w-full h-96 rounded-xl bg-neutral-900' />}>
                    <MediaBlock withAmbiLight={user.isSubscriber || false} {...shot.rootBlock} autoPlay />
                </Suspense>
                {
                    shot.blocks.map((block, index) => {
                        if (block.type === 'image') {
                            return (
                                <Suspense key={`block#${index}`} fallback={<ImageLoader />}>
                                     <MediaBlock {...block} />
                                </Suspense>
                            )
                        }
                        if (block.type === 'text') {
                            return <TextBlock key={`block#${index}`} enableMdSyntax={shot.enableMdSyntax || false} block={block} />
                        }
                        return null
                    })
                }
            </div>
            <ConfettiForNewShot views={shot.views.length} />
            <ShotPageFooter shot={shot} user={user} />
        </section>
    )
}

export default ShotPage