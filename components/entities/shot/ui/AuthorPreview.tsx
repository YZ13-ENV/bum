'use client'
import Avatar from '@/components/shared/Avatar'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Button } from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'
import MediaBlock from '../../Blocks/MediaBlock'
import { fetchFile } from '@/helpers/fetchFile'
import Link from 'next/link'

type Props = {
    uid: string
    user: ShortUserData | null
}
const AuthorPreview = ({ uid, user }: Props) => {
    const [shots, setShots] = useState<DocShotData[]>([]) 
    const getLastWorks = async(userId: string) => {
        try {
            const res = await fetch(`${getHost()}/shots/onlyShots?userId=${userId}&asDoc=true&limit=2&order=popular}`, { next: { revalidate: 3600 } })
            const shots: DocShotData[] = await res.json()
            setShots(shots)
        } catch(e) {
            console.log(e)
            setShots([])
        }
    }
    useLayoutEffect(() => {
        getLastWorks(uid)
    },[uid])
    return (
        <div className='flex flex-col w-64 gap-2 h-36'>
            <div className="flex items-center justify-between w-full gap-2 shrink-0 h-fit">
                <div className="flex items-center gap-2 w-fit h-fit">
                    <Avatar src={user ? user.photoUrl : null} size={32} noLabel isSub={user?.isSubscriber || false} direction='left' />
                    <div className="flex flex-col justify-center w-fit h-fit">
                        <span className='text-base font-medium text-neutral-200'>{user?.displayName || 'Пользователь'}</span>
                        <span className='text-xs text-neutral-400'>{user?.email}</span>
                    </div>
                </div>
                <Button href={`/${uid}`}><BiRightArrowAlt size={17} /></Button>
            </div>
            {
                shots.length !== 0 &&
                <div className="flex items-center w-full h-full gap-2">
                    {
                        shots.map(shot => 
                            <Link href={`/view?s=${shot.doc_id}`} 
                            key={shot.doc_id + shot.authorId} className="flex flex-col items-center justify-center w-1/2 h-full gap-2 border rounded-lg border-neutral-700">
                                <MediaBlock link={shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link} object='cover' autoPlay={false} />
                            </Link>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default AuthorPreview