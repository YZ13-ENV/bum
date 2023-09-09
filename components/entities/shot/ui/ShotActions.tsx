'use client'
import { DocShotData } from '@/types'
import { Button, Space } from 'antd'
import React, { useMemo, useState } from 'react'
import { BiHeart, BiSolidHeart, BiSolidMessageRoundedDots, BiSolidShow } from 'react-icons/bi'
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
            <Button onClick={addOrRemoveLike} loading={loading} size='small' 
            danger={isInclude} type={'text'} className='!text-sm !font-semibold'
            icon={isInclude 
                ? <BiSolidHeart size={15} className='inline my-auto mb-0.5 mr-1' /> 
                : <BiHeart size={15} className='inline my-auto mb-0.5 mr-1' />}>{likes.length}</Button>
            <div className="flex items-center rounded-full w-fit h-fit">
                <Space.Compact>
                    { shot.needFeedback && <Button type='text' shape='round' size='small' className='!text-sm !font-semibold !pr-1' icon={<BiSolidMessageRoundedDots size={15} className='inline my-auto mb-0.5 mr-1' />}>{shot.comments.length}</Button> }
                    <Button type='text' shape='round' size='small' className={`${shot.needFeedback ? '!pl-1' : '!px-1'} !text-sm !font-semibold`} icon={<BiSolidShow size={15} className='inline my-auto mb-0.5 mr-1' />}>{shot.views.length}</Button>
                </Space.Compact>
            </div>
        </div>
    )
}

export default ShotActions