import Avatar from '@/components/shared/Avatar'
import { getHost } from '@/helpers/getHost'
import { CommentBlock, ShortUserData } from '@/types'
import { DateTime } from 'luxon'
import { useLayoutEffect, useState } from 'react'

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
            const userRes = await fetch(`${getHost()}/users/shortData?userId=${authorId}`, { method: 'GET', next: { revalidate: 360 } })
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
            <div className="h-6 w-14 shrink-0 rounded-xl bg-neutral-900 animate-pulse" />
        )
    }
    return (
        <div className='flex items-center gap-2 w-fit h-fit'>
            <Avatar src={user.photoUrl} size={32} />
            <div className="flex flex-col w-fit h-fit">
                <span className='text-sm font-bold text-neutral-200'>{user.displayName || 'Пользователь'}</span>
                <div className="text-xs text-neutral-400">{DateTime.fromSeconds(createdAt).setLocale('ru').toRelative()}</div>
            </div>
        </div>
    )
}

export default CommentAuthor