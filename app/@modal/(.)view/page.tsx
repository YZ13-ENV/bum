'use client'
import { getShot, getUser } from '@/app/fetchers'
import UserStatus from '@/components/entities/user'
import PreviewShotPage from '@/components/pages/PreviewShotPage'
import ShotPage from '@/components/pages/ShotPage'
import { DocShotData, ShortUserData } from '@/types'
import { Button } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useLayoutEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import Loading from './loading'

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
        <div className='fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50'>
            <section className='flex flex-col w-full h-[80vh] max-w-5xl p-12 mx-auto overflow-x-hidden overflow-y-auto bg-black border border-neutral-900 rounded-xl'>
                <Suspense fallback={<Loading />}>
                {
                    loading
                    ? <Loading />
                    : (!s || !shot || !user)
                    ?
                    <div className="flex flex-col items-center self-center justify-center w-full h-full max-w-md gap-4 my-auto">
                        <h3 className='text-3xl font-bold text-neutral-200'>Такой работы нет</h3>
                        { process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' && JSON.stringify(s, null, 2) }
                        <Button size='large' type='primary' color='white' onClick={jumpBack} >Вернуться</Button>
                    </div>
                    :
                    <PreviewShotPage shot={shot} user={user} />
                }
                </Suspense>
            </section>
        </div>
    )
}

export default ViewModal