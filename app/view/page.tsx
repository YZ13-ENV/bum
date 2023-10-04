import Link from 'next/link'
import React from 'react'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Metadata } from 'next'
// import { redirect } from 'next/navigation'
import { fetchFile } from '@/helpers/fetchFile'
import { DateTime } from 'luxon'
import ShotPage from '@/components/pages/ShotPage'

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
        return null
    }
}
const getShot = async(shotId: string) => {
    try {
        const shotRes = await fetch(`${getHost()}/shots/shot/${shotId}`, { method: 'GET', cache: 'no-store' })
        const shot: DocShotData = await shotRes.json()
        return shot
    } catch(e) {
        console.log(e)
        return null
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
        <ShotPage shot={shot} user={user} needConfetti />
    )
}
export default ShotPageV2