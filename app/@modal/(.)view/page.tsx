'use client'
import { getShot, getUser } from '@/app/fetchers'
import PreviewShotPage from '@/components/pages/PreviewShotPage'
import { DocShotData, ShortUserData } from '@/types'
import React, { Suspense, useLayoutEffect, useState } from 'react'
import Loading from './loading'
import { useSearchParams } from 'next/navigation'

const ViewModal = () => {
    const [shot, setShot] = useState<DocShotData | null>(null)
    const [user, setUser] = useState<ShortUserData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const searchQueries = useSearchParams()
    const s = searchQueries.get('s')
    useLayoutEffect(() => {
        if (s) {
            setLoading(true)
            const shotId = s
            getShot(shotId)
            .then(res => setShot(res))
            .catch(() => setLoading(false))
        }
    }, [s])
    useLayoutEffect(() => {
        if (shot) {
            getUser(shot.authorId)
            .then(res => setUser(res))
            .finally(() => setLoading(false))
        }
    }, [shot])

    return (
        <div className='fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-70'>
            <section className='flex flex-col w-full h-[80vh] max-w-5xl md:p-12 p-4 mx-auto overflow-x-hidden overflow-y-auto bg-black border border-neutral-900 rounded-xl'>
                <Suspense fallback={<Loading />}>
                {
                    loading
                    ? <Loading />
                    : (!s || !shot || !user)
                    ?
                    <div className="flex flex-col items-center self-center justify-center w-full h-full max-w-md gap-4 my-auto">
                        <h3 className='text-3xl font-bold text-neutral-200'>Такой работы нет</h3>
                        { process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' && JSON.stringify(s, null, 2) }
                        {/* <Button size='large' type='primary' color='white' onClick={jumpBack} >Вернуться</Button> */}
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