import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
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
            title: shot.title
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