import dynamic from 'next/dynamic'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { fetchFile } from '@/helpers/fetchFile'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { BiLeftArrowAlt, BiLoaderAlt } from 'react-icons/bi'
const ImageLoader = dynamic(() => import('@/components/shared/Loaders/ImageLoader')) 
const TextLoader = dynamic(() => import('@/components/shared/Loaders/TextLoader')) 
const ConfettiForNewShot = dynamic(() => import('@/components/widgets/Confetti')) 
const ShotPageFooter = dynamic(() => import('@/components/widgets/ShotPageFooter')) 
const TextBlock = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/TextBlock'), {
    loading: () => <TextLoader />
})
const MediaBlock = dynamic(() => import('@/components/entities/Blocks/MediaBlock'), {
    loading: () => <div className='w-full h-96 rounded-xl bg-neutral-900' />
}) 
type Props = {
    params: {
        shotId: string
        userId: string
    }
}

const getUser = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', next: { revalidate: 3600 } })
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
        return redirect('/')
    }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    if (process.env.NODE_ENV === 'development') return {}
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
    if (!shot) return (
        <section className='flex flex-col items-center justify-center w-full min-h-full gap-6'>
            <h1 className='text-2xl font-bold text-center text-neutral-200'>Такой работы не существует</h1>
            <Link href='/' className='inline-flex items-center gap-2'><BiLeftArrowAlt size={15} /> <span className='text-sm'>Вернуться на главную</span></Link>
        </section>
    )
    if (!user) return null
    return (
        <section className='relative flex flex-col w-full min-h-full px-2 py-4 gap-14 lg:px-0'>
            <div className="flex flex-col w-full max-w-md mx-auto gap-14 md:max-w-4xl h-fit shrink-0">
                <div className="flex items-center justify-center w-full max-w-2xl gap-1 px-4 py-2 mx-auto h-fit">
                    <h1 className='text-4xl font-extrabold text-center text-neutral-200'>{shot.title}</h1>
                </div>
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
                            return (
                                <div key={`block#${index}`} className="px-4 md:px-0">
                                    <TextBlock enableMdSyntax={shot.enableMdSyntax || false} block={block} />
                                </div>
                            )
                        }
                        return null
                    })
                }
            </div>
            <ConfettiForNewShot views={shot.views.length} />
            <Suspense fallback={<div className='flex items-center justify-center w-full h-96'><BiLoaderAlt size={17} className='animate-spin'/></div>}>
                <ShotPageFooter shot={shot} user={user} />
            </Suspense>
        </section>
    )
}

export default ShotPage