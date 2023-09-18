'use client'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import TextBlock from '@/components/entities/Blocks/ViewBlocks/TextBlock'
import ShotPageFooter from '@/components/widgets/ShotPageFooter'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import React, { Suspense, useLayoutEffect, useState } from 'react'
import { BiLoaderAlt, BiX } from 'react-icons/bi'

type Props = {
    params: {
        shotId: string
        userId: string
    }
}
const ModalShotPage = ({ params }: Props) => {
    const router = useRouter()
    const [shot, setShot] = useState<DocShotData | null>(null)
    const [user, setUser] = useState<ShortUserData | null>(null)
    const getUserShort = async() => {
        try {
            const userRes = await fetch(`${getHost()}/users/shortData?userId=${params.userId}`, { method: 'GET', next: { revalidate: 3600 } })
            const user: { short: ShortUserData } | null = await userRes.json()
            setUser(user ? user.short : null)
        } catch(e) {
            setUser(null)
        }
    }
    const getShot = async() => {
        try {
            const shotRes = await fetch(`${getHost()}/shots/shot?userId=${params.userId}&shotId=${params.shotId}`, { method: 'GET', cache: 'no-store' })
            const shot: DocShotData = await shotRes.json()
            setShot(shot)
        } catch(e) {
            console.log(e)
            setShot(null)
        }
    }
    const jumpBack = () => {
        const root = document.getElementById("root")
        root?.classList.remove('overflow-hidden')
        router.back()
    }
    useLayoutEffect(() => {
        const root = document.getElementById("root")
        root?.classList.add('overflow-hidden')
        getUserShort()
        getShot()
    },[params])
    if (!user || !shot) return (
        <div onClick={jumpBack}
        className='fixed top-0 left-0 z-50 flex flex-col items-center justify-end w-full h-full bg-black bg-opacity-50'>
            <section onClick={e => e.stopPropagation()} className='flex flex-col items-center justify-center w-full max-w-6xl p-2 mx-auto h-5/6 shrink-0 rounded-t-xl bg-neutral-950'>
                <BiLoaderAlt size={21} className='animate-spin' />
            </section>
        </div>
    )
    return (
        <div onClick={jumpBack}
        className='fixed top-0 left-0 z-50 flex flex-col items-center justify-start w-full h-full overflow-y-auto bg-black bg-opacity-50'>
            <div onClick={e => e.stopPropagation()} className="flex items-start justify-end w-full max-w-6xl py-4 h-1/6">
                <Button onClick={jumpBack} type='text'><BiX size={25} /></Button>
            </div>
            <section onClick={e => e.stopPropagation()} className='flex flex-col w-full max-w-6xl min-h-full px-2 py-4 mx-auto gap-14 lg:px-0 h-fit shrink-0 rounded-t-xl bg-neutral-950'>
                <div className="flex flex-col w-full max-w-md mx-auto gap-14 md:max-w-4xl h-fit shrink-0">
                    <div className="flex items-center justify-center w-full max-w-2xl gap-1 px-4 py-2 mx-auto h-fit">
                        <h1 className='text-4xl font-extrabold text-center text-neutral-200'>{shot.title}</h1>
                    </div>
                    <MediaBlock withAmbiLight={user.isSubscriber || false} {...shot.rootBlock} autoPlay />
                    {
                        shot.blocks.map((block, index) => {
                            if (block.type === 'image') {
                                return <MediaBlock key={`block#${index}`} {...block} />
                                
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
                {/* <ConfettiForNewShot views={shot.views.length} /> */}
                <Suspense fallback={<div className='flex items-center justify-center w-full h-96'><BiLoaderAlt size={17} className='animate-spin'/></div>}>
                    <ShotPageFooter shot={shot} user={user} />
                </Suspense>
            </section>
        </div>
    )
}

export default ModalShotPage