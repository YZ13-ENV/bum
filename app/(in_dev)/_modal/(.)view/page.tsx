'use client'
import UserStatus from '@/components/entities/user'
import ShotPage from '@/components/pages/ShotPage'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Button } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useLayoutEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

const getUser = async(userId: string): Promise<ShortUserData | null> => {
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
const getShot = async(shotId: string): Promise<DocShotData | null> => {
    try {
        const shotRes = await fetch(`${getHost()}/shots/shotById?&shotId=${shotId}`, { method: 'GET', cache: 'no-store' })
        const shot: DocShotData = await shotRes.json()
        return shot
    } catch(e) {
        console.log(e)
        return null
    }
}
const ViewModal = () => {
    const searchQueries = useSearchParams()
    const s = searchQueries.get('s')
    const [shot, setShot] = useState<DocShotData | null>(null)
    const [user, setUser] = useState<ShortUserData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const jumpBack = () => {
        const root = document.getElementById("root")
        root?.classList.remove('overflow-hidden')
        setUser(null)
        setShot(null)
        router.back()
    }
    useLayoutEffect(() => {
        if (shot) {
            getUser(shot.authorId)
            .then(res => setUser(res))
            .finally(() => setLoading(false))
        }
    }, [shot])
    useLayoutEffect(() => {
        const root = document.getElementById("root")
        root?.classList.add('overflow-hidden')
        if (s) {
            setLoading(true)
            const shotId = s
            getShot(shotId)
            .then(res => setShot(res))
            .catch(() => setLoading(false))
        }
    }, [s])
    return (
        <div className='fixed top-0 left-0 z-50 flex flex-col w-full h-full bg-black bg-opacity-50'>
            <div className="relative flex items-start justify-between w-full p-10 h-36 shrink-0">
                <UserStatus showDropdown={false} />
                <Button size='large' color='white' onClick={jumpBack} >Вернуться</Button>
            </div>
            <section className='flex flex-col w-full h-full py-8 overflow-x-hidden overflow-y-auto bg-black border-t border-x border-neutral-900 rounded-t-3xl'>
                {
                    loading
                    ? <div className='flex flex-col items-center justify-center w-full h-full'><BiLoaderAlt size={17} className='animate-spin' /></div>
                    : (!s || !shot || !user)
                    ?
                    <div className="flex flex-col items-center self-center justify-center w-full h-full max-w-md gap-4 my-auto">
                        <h3 className='text-3xl font-bold text-neutral-200'>Такой работы нет</h3>
                        { process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' && JSON.stringify(s, null, 2) }
                        <Button size='large' type='primary' color='white' onClick={jumpBack} >Вернуться</Button>
                    </div>
                    :
                    <ShotPage shot={shot} user={user} />
                }
            </section>
        </div>
    )
}

export default ViewModal