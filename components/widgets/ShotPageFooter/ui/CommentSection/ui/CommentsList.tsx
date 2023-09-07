'use client'
import { DocShotData } from '@/types'
import { db } from '@/utils/app'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useLayoutEffect, useState } from 'react'
import Comment from './Comment'

type Props = {
    authorId: string
    shotId: string
    commentsList: DocShotData['comments']
}
const CommentsList = ({ authorId, shotId, commentsList }: Props) => {
    const [comments, setComments] = useState<DocShotData['comments']>(commentsList)
    useLayoutEffect(() => {
        const ref = doc(db, 'users', authorId, 'shots', shotId)
        const unSub = onSnapshot(ref, snap => {
            // console.log(snap.data())
            if (snap.exists()) {
                const snapData = snap.data()
                const snapComments: DocShotData['comments'] = snapData['comments']
                setComments(snapComments)
            }
            
        })
    },[])
    if (comments.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-36">
                <span className='text-sm text-neutral-400'>Пока что никто не оставил комментарий</span>
            </div>
        )
    }
    return (
        <div className='flex flex-col w-full gap-2 shrink-0 h-fit'>
            {
                comments.sort((a, b) => a.createdAt - b.createdAt).map((comment, index) => 
                <Comment key={comment.id + comment.authorId} shotAuthor={authorId} shotId={shotId} comment={comment} /> )
            }
        </div>
    )
}

export default CommentsList