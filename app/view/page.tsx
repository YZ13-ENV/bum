import Link from 'next/link'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { fetchFile } from '@/helpers/fetchFile'
import { DateTime } from 'luxon'
import ViewsHistoryWatcher from '@/components/entities/ViewsHistoryWatcher'
import { BiLoaderAlt } from 'react-icons/bi'
const TextLoader = dynamic(() => import('@/components/shared/Loaders/TextLoader')) 
const ConfettiForNewShot = dynamic(() => import('@/components/widgets/Confetti')) 
const ShotPageFooter = dynamic(() => import('@/components/widgets/ShotPageFooter')) 
const TextBlock = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/TextBlock'), {
    loading: () => <TextLoader />
})
const MediaBlock = dynamic(() => import('@/components/entities/Blocks/MediaBlock'), {
    loading: () => <div className='w-full aspect-[4/3] rounded-xl bg-neutral-900' />
}) 

const getUser = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', next: { revalidate: 3600 } })
        const user: { short: ShortUserData } | null = await userRes.json()
        if (!user) {
            const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', cache: 'no-store' })
            const user: { short: ShortUserData } | null = await userRes.json()
            return user ? user.short : null
        } else return user ? user.short : null
    } catch(e) {
        return redirect('/')
    }
}
const getShot = async(shotId: string) => {
    try {
        const shotRes = await fetch(`${getHost()}/shots/shotById?&shotId=${shotId}`, { method: 'GET', cache: 'no-store' })
        const shot: DocShotData = await shotRes.json()
        return shot
    } catch(e) {
        console.log(e)
        return redirect('/')
    }
}
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const shotId = { userId: '', shotId: '' }
    if (process.env.NODE_ENV === 'development' || !shotId) return {}
    try {
        const shotData = shotId ? getShot(shotId.shotId) : null
        const [shot] = await Promise.all([shotData])
        const user = shot ? await getUser(shot.authorId) : null
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
type Props = {
    searchParams: {
        s: string | null
    }
}
const ShotPage = async({ searchParams }: Props) => {
    const shotId = searchParams.s
    const shotData = shotId ? getShot(shotId) : null
    const [shot] = await Promise.all([shotData])
    const user = shot ? await getUser(shot.authorId) : null
    if (!searchParams.s || !shotId || !shot || !user) return (
        <div className="flex flex-col items-center self-center justify-center w-full h-full max-w-md gap-4 my-auto">
            <h3 className='text-3xl font-bold text-neutral-200'>Такой работы нет</h3>
            { process.env.NODE_ENV === 'development' && JSON.stringify(shotId, null, 2) }
            <Link href='/' className='px-3 py-1 text-sm text-black bg-white rounded-lg'>Вернуться</Link>
        </div>
    )
    // return (
    //     <div className="flex flex-col items-center self-center justify-center w-full h-full max-w-md gap-4 my-auto">
    //         <h3 className='text-3xl font-bold text-neutral-200'>Такая работа есть</h3>
    //         { process.env.NODE_ENV === 'development' && JSON.stringify(shotId, null, 2) }
    //         <Link href='/' className='px-3 py-1 text-sm text-black bg-white rounded-lg'>Вернуться</Link>
    //     </div>
    // )
    return (
        <section id='shot-page' className='relative flex flex-col w-full min-h-full p-4 gap-14 lg:px-0'>
            <div className="flex flex-col w-full max-w-md mx-auto gap-14 md:max-w-4xl h-fit shrink-0">
                <ViewsHistoryWatcher authorId={shot.authorId} shotId={shot.doc_id}  />
                <div className="flex items-center justify-center w-full max-w-2xl gap-1 px-4 py-2 mx-auto h-fit">
                    <h1 className='text-4xl font-extrabold text-center text-neutral-200'>{shot.title}</h1>
                </div>
                <MediaBlock withAmbiLight={user.isSubscriber || false} {...shot.rootBlock} autoPlay />
                <div className="flex flex-col w-full px-6 md:px-12 h-fit gap-14">
                {
                    shot.blocks.map((block, index) => {
                        if (block.type === 'image') {
                            return <MediaBlock key={`block#${index}`} {...block} />
                            
                        }
                        if (block.type === 'text') {
                            return (
                                <TextBlock key={`block#${index}`} enableMdSyntax={shot.enableMdSyntax || false} block={block} />
                            )
                        }
                        return null
                    })
                }
                </div>
            </div>
            <ConfettiForNewShot views={shot.views.length} />
            <Suspense fallback={<div className='flex items-center justify-center w-full h-96'><BiLoaderAlt size={17} className='animate-spin'/></div>}>
                <ShotPageFooter shot={shot} user={user} />
            </Suspense>
        </section>
    )
}
export default ShotPage