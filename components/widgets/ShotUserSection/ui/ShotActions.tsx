'use client'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import { auth } from '@/utils/app'
import { Button } from 'antd'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiHeart, BiBookmark } from 'react-icons/bi'

type Props = {
    shot: DocShotData
}
const ShotActions = ({ shot }: Props) => {
    const [user] = useAuthState(auth)
    const [likes, setLikes] = useState<string[]>(shot.likes)
    const isInclude = useMemo(() => user ? likes.includes(user.uid) : false, [user, likes]) 
    const addViews = async() => {
        if (user) {
            await fetch(`${getHost()}/shots/addView?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                method: 'PATCH'
            })
        }
    }
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
        useLayoutEffect(() => {
            if (user) addViews()
        },[user])
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <Button onClick={addOrRemoveLike} className='!p-2 !h-fit'><BiHeart size={23} /></Button>
            <Button className='!p-2 !h-fit' disabled><BiBookmark size={23} /></Button>
        </div>
    )
}

export default ShotActions