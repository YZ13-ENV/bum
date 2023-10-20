import Link from 'next/link'
import React from 'react'
import { Metadata } from 'next'
import { fetchFile } from '@/helpers/fetchFile'
import { DateTime } from 'luxon'
import ShotPage from '@/components/pages/ShotPage'
import { getShot, getUser } from '../fetchers'
import Footer from '@/components/shared/Footer'
import AppHeader from '@/components/widgets/AppHeader'


export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    if (process.env.NODE_ENV === 'development' || !searchParams.s) return {}
    try {
        const shotData = searchParams.s ? getShot(searchParams.s) : null
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
                site: `https://design.darkmaterial.space/view?s=${shot.doc_id}`,
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
const ShotPageV2 = async({ searchParams }: Props) => {
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
    return (
        <>
            <AppHeader />
            <ShotPage shot={shot} user={user} needConfetti />
            <Footer />
        </>
    )
}
export default ShotPageV2