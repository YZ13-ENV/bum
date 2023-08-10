'use client'
import { DocShotData, ShotData } from '@/types'
import { Button } from 'antd'
import React, { useState } from 'react'
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
    const isInclude = user ? likes.includes(user.uid) : false
    const addOrRemoveLike = async() => {
        if (user) {
            if (isInclude) {
                const filteredLikes = likes.filter(like => like !== user.uid)
                setLikes(filteredLikes)
                const preparedShot: ShotData = {
                    isDraft: shot.isDraft,
                    authorId: shot.authorId,
                    title: shot.title,
                    rootBlock: shot.rootBlock,
                    blocks: shot.blocks,
                    createdAt: shot.createdAt,
                    likes: filteredLikes,
                    views: shot.views,
                    comments: shot.comments,
                    needFeedback: shot.needFeedback,
                    tags: shot.tags,
                    thumbnail: shot.thumbnail || null
                }
                try {
                    const headers = new Headers()
                    headers.set("Content-Type", "application/json")
                    await fetch(`${getHost()}/shots/updateShot?userId=${shot.authorId}&shotId=${shot.doc_id}`, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(preparedShot)
                    })
                } catch(e) {
                    console.log(e)
                }
            } else {
                const addedLikes = [...likes, user.uid]
                setLikes(addedLikes)
                const preparedShot: ShotData = {
                    isDraft: shot.isDraft,
                    authorId: shot.authorId,
                    title: shot.title,
                    rootBlock: shot.rootBlock,
                    blocks: shot.blocks,
                    createdAt: shot.createdAt,
                    likes: addedLikes,
                    views: shot.views,
                    comments: shot.comments,
                    needFeedback: shot.needFeedback,
                    tags: shot.tags,
                    thumbnail: shot.thumbnail || null
                }
                try {
                    const headers = new Headers()
                    headers.set("Content-Type", "application/json")
                    await fetch(`${getHost()}/shots/updateShot?userId=${shot.authorId}&shotId=${shot.doc_id}`, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(preparedShot)
                    })
                } catch(e) {
                    console.log(e)
                }
            }
        }
    }
    return (
        <div onClick={e => e.stopPropagation()} className="absolute bottom-0 right-0 flex items-center gap-2 p-2 transition-all w-fit h-fit">
            <Button danger={isInclude} icon={<BiHeart  size={15} onClick={addOrRemoveLike} 
            className='inline my-auto mb-0.5 mr-1' />}>{likes.length}</Button>
            <Button icon={<BiShow size={15} className='inline my-auto mb-0.5 mr-1' />}>{shot.views.length}</Button>
        </div>
    )
}

export default ShotActions