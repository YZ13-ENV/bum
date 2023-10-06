'use client'
import Avatar from '@/components/shared/Avatar'
import { randomString } from '@/helpers/randomString'
import { CommentBlock, CommentBlockNoAnswers, ShotData } from '@/types'
import { auth, db } from '@/utils/app'
import { Button, Input } from 'antd'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiSend } from 'react-icons/bi'

type Props = {
    shotAuthor: string
    shotId: string
    comment: CommentBlock
    setWantReply: React.Dispatch<React.SetStateAction<boolean>>
}
const NewReply = ({ shotAuthor, shotId, comment, setWantReply }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [user] = useAuthState(auth)
    const pushReply = async() => {
        const shotRef = doc(db, 'users', shotAuthor, 'shots', shotId)
        const shotSnap = await getDoc(shotRef)
        if (shotSnap.exists() && user && text.length !== 0) {
            try {
                setLoading(true)
                const newCommentReply: CommentBlockNoAnswers = {
                    authorId: user.uid,
                    createdAt: DateTime.now().toSeconds(),
                    id: randomString(15),
                    text: text
                }
                const shot = shotSnap.data() as ShotData
                const updatedComments = shot.comments.map(shotComment => {
                    if (comment.id === shotComment.id) {
                        const withAddedComment: CommentBlock = {
                            ...shotComment,
                            answers: [...shotComment.answers, newCommentReply]
                        }
                        return withAddedComment
                    } return shotComment
                })
                const updatedShot: ShotData = {
                    ...shot,
                    comments: updatedComments
                }
                await updateDoc(shotRef, updatedShot)
                setText('')
                setLoading(false)
                setWantReply(false)
            } catch(e) {
                setLoading(false)
                setWantReply(false)
            }
 
        }
    }
    if (!user) return null
    return (
        <div className="flex items-center justify-end w-full gap-2 h-fit">
            <Avatar src={user?.photoURL || null} size={28} />
            <Input value={text} onChange={e => setText(e.target.value)} placeholder='Хотите ответить?' />
            <Button onClick={pushReply} type={text.length !== 0 ? 'primary' : 'default'}
            disabled={!user || text.length === 0} loading={loading}>{ !loading && <BiSend size={15} /> }</Button>
        </div>
    )
}

export default NewReply