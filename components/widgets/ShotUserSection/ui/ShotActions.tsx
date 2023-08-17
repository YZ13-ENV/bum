'use client'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import { auth } from '@/utils/app'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiHeart, BiBookmark, BiTrashAlt } from 'react-icons/bi'

type Props = {
    shot: DocShotData
}
const ShotActions = ({ shot }: Props) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [likes, setLikes] = useState<string[]>(shot.likes)
    const [loading, setLoading] = useState<boolean>(false)
    const isInclude = useMemo(() => user ? likes.includes(user.uid) : false, [user, likes]) 
    const addViews = async() => {
        if (user) {
            setLoading(true)
            await fetch(`${getHost()}/shots/addView?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                method: 'PATCH'
            })
            setLoading(false)
        }
    }
    const deleteShot = async() => {
        if (user) {
            setLoading(true)            
            const res = await fetch(`${getHost()}/shots/shot?userId=${user.uid}&shotId=${shot.doc_id}`, { method: "DELETE" })
            if (res.ok) router.push(`/${user.uid}`)
            setLoading(false)
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
                setLoading(true)
                try {
                    await fetch(`${getHost()}/shots/addOrRemoveLikes?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                        method: 'PATCH'
                    })
                    setLoading(false)
                } catch(e) {
                    setLoading(false)
                    console.log(e)
                }
            }
        }
        useLayoutEffect(() => {
            if (user) addViews()
        },[user])
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <Button loading={loading} onClick={addOrRemoveLike} danger={isInclude ? true: false} type={isInclude ? 'primary' : 'default'}><BiHeart size={17} /></Button>
            {/* <Button loading={loading} disabled><BiBookmark size={23} /></Button> */}
            {
                (user && user.uid === shot.authorId) && <Button loading={loading} onClick={deleteShot} danger type='primary'><BiTrashAlt size={17} /></Button>
            }
        </div>
    )
}

export default ShotActions