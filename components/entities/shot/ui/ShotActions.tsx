'use client'
import { DocShotData, ShotData } from '@/types'
import { Button } from 'antd'
import React, { useMemo, useState } from 'react'
import { BiHeart, BiShow } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { getHost } from '@/helpers/getHost'

type Props = {
    shot: DocShotData
}
const ShotActions = ({ shot }: Props) => {
    const [user] = useAuthState(auth)
    const [likes, setLikes] = useState<string[]>(shot.likes)
    const isInclude = useMemo(() => user ? likes.includes(user.uid) : false, [user, likes]) 
    const addOrRemoveLike = async() => {
        if (user) {
            if (isInclude) {
                const updatedLikes = likes.filter(uid => uid !== user.uid)
                setLikes(updatedLikes)
            } 
            if (!isInclude) {
                setLikes([...likes, user.uid])
            }
            try {
                await fetch(`${getHost()}/shots/addOrRemoveLikes?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                    method: 'PATCH'
                })
            } catch(e) {
                console.log(e)
            }
        }
    }
    return (
        <div onClick={e => e.stopPropagation()} className="absolute bottom-0 right-0 flex items-center gap-2 p-2 transition-all w-fit h-fit">
            <Button danger={isInclude} type={isInclude ? 'primary' : 'default'} icon={<BiHeart  size={15} onClick={addOrRemoveLike} 
            className='inline my-auto mb-0.5 mr-1' />}>{likes.length}</Button>
            <Button icon={<BiShow size={15} className='inline my-auto mb-0.5 mr-1' />}>{shot.views.length}</Button>
        </div>
    )
}

export default ShotActions