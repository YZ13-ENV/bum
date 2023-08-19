'use client'
import { DocShotData } from '@/types'
import { Button } from 'antd'
import React, { useMemo, useState } from 'react'
import { BiHeart, BiShow } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { getHost } from '@/helpers/getHost'

type Props = {
    shot: DocShotData
    isOnPage?: boolean
}
const ShotActions = ({ shot, isOnPage=false }: Props) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const [likes, setLikes] = useState<string[]>(shot.likes)
    const isInclude = useMemo(() => user ? likes.includes(user.uid) : false, [user, likes]) 
    const addOrRemoveLike = async() => {
        if (user) {
            setLoading(true)
            try {
                const res = await fetch(`${getHost()}/shots/addOrRemoveLikes?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                    method: 'PATCH'
                })
                if (res.ok) {
                    if (isInclude) {
                        const updatedLikes = likes.filter(uid => uid !== user.uid)
                        setLikes(updatedLikes)
                    } 
                    if (!isInclude) {
                        setLikes([...likes, user.uid])
                    }
                }
                setLoading(false)
            } catch(e) {
                setLoading(false)
                console.log(e)
            }
        }
    }
    if (isOnPage) {
        return (
            <Button onClick={addOrRemoveLike} loading={loading} shape='round' size='small' 
            danger={isInclude} type={isInclude ? 'primary' : 'default'} 
            icon={<BiHeart  size={13} className='inline my-auto mb-0.5 mr-1' />}>{likes.length}</Button>
        )
    }
    return (
        <div onClick={e => e.stopPropagation()} className="flex items-center gap-2 p-2 transition-all w-fit h-fit">
            <Button onClick={addOrRemoveLike} loading={loading} shape='round' size='small' 
            danger={isInclude} type={isInclude ? 'primary' : 'default'} 
            icon={<BiHeart  size={13} className='inline my-auto mb-0.5 mr-1' />}>{likes.length}</Button>
            <Button shape='round' size='small' icon={<BiShow size={13} className='inline my-auto mb-0.5 mr-1' />}>{shot.views.length}</Button>
        </div>
    )
}

export default ShotActions