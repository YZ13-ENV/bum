import { getHost } from '@/helpers/getHost'
import { CommentBlock, ShortUserData } from '@/types'
import { DateTime } from 'luxon'
import Image from 'next/image'
import React, { useLayoutEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi'

type Props = {
    authorId: string
    createdAt: CommentBlock['createdAt']
}
const CommentAuthor = ({ authorId, createdAt }: Props) => {
    const [user, setUser] = useState<ShortUserData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const getUser = async() => {
        try {
            setLoading(true)
            const userRes = await fetch(`${getHost()}/users/shortData?userId=${authorId}`, { method: 'GET', cache: 'no-cache' })
            if (userRes.ok) {
                const user: { short: ShortUserData } | null = await userRes.json()
                setLoading(false)
                if (user) {
                    setUser(user.short)
                }
            } else setLoading(false)
        } catch(e) {
            setLoading(false)
            console.log(e)
        }
    }
    useLayoutEffect(() => {
        getUser()
    },[])
    if (!user || loading) {
        return (
            <div className="h-6 w-14 rounded-xl bg-neutral-900 animate-pulse" />
        )
    }
    return (
        <div className='flex items-center gap-2 w-fit h-fit'>
            {
                user.photoUrl !== ''
                ? <Image src={user.photoUrl} className='rounded-full' width={32} height={32} alt={authorId} />
                : <div className='flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 shrink-0'><BiUser size={13} /></div>
            }
            <div className="flex flex-col w-fit h-fit">
                <span className='text-sm font-bold text-neutral-200'>{user.displayName || 'Пользователь'}</span>
                <div className="text-xs text-neutral-400">{DateTime.fromSeconds(createdAt).toLocaleString(DateTime.DATE_MED)}</div>
            </div>
        </div>
    )
}

export default CommentAuthor