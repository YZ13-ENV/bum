'use client'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import { auth } from '@/utils/app'
import { Button, Dropdown, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiHeart, BiBookmark, BiTrashAlt, BiDotsVerticalRounded } from 'react-icons/bi'

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
        const items: MenuProps['items'] = [
            {
                key: 0,
                label: 'Удалить',
                icon: <BiTrashAlt size={13} className='inline mr-1'  />,
                danger: true,
                onClick: deleteShot
            }
        ]
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <Button loading={loading} onClick={addOrRemoveLike} danger={isInclude ? true: false} 
            icon={<BiHeart size={17} className='inline mr-1 mb-0.5' />} type={isInclude ? 'primary' : 'default'}>{shot.likes.length}</Button>
            {
                (user && user.uid === shot.authorId) && 
                <Dropdown menu={{items}}>
                    <Button><BiDotsVerticalRounded size={17} /></Button>
                </Dropdown>
            }
        </div>
    )
}

export default ShotActions