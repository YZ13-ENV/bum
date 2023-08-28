import { fetchFile } from '@/helpers/fetchFile'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import { DateTime } from 'luxon'
import { Metadata } from 'next'
import React from 'react'
type Props = {
    children: React.ReactNode
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
            title: shot.title,
            description: 'Добро пожаловать в Dey, начните исследовать мир дизайна уже сегодня',
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
            keywords: 'dribbble, dey, behance'
        }
    } catch(e) {
        return {
            title: 'Ошибка'
        }
    }
}
const ShotLayout = ({ children, params }: Props) => {
    return (
        <section className='relative flex flex-col w-full min-h-full gap-6 px-4 pb-4 md:px-0 h-fit'>
            {children}
        </section>
    )
}

export default ShotLayout