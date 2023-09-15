import { CommentBlockNoAnswers, ShotData } from '@/types'
import React from 'react'
import CommentAuthor from './CommentAuthor'
import { BiDotsVerticalRounded, BiTrashAlt } from 'react-icons/bi'
import { MenuProps, Dropdown, Button } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/utils/app'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

type Props = {
    comment: CommentBlockNoAnswers
    parentCommentId: string
    authorId: string
    shotId: string
}
const CommentReply = ({ parentCommentId, comment, authorId, shotId }: Props) => {
    const [user] = useAuthState(auth)
    const removeComment = async() => {
        if (user && user.uid === comment.authorId) {
            const shotRef = doc(db, 'users', authorId, 'shots', shotId)
            const shotSnap = await getDoc(shotRef)
            if (shotSnap.exists()) {
                try {
                    const shot = shotSnap.data() as ShotData
                    const updatedComments = shot.comments.map(rootComment => {
                        if (rootComment.id === parentCommentId) {
                            const filtered = rootComment.answers.filter(reply => reply.id !== comment.id)
                            return {
                                ...rootComment,
                                answers: filtered
                            }
                        } else return rootComment
                    })
                    const updatedShot = {
                        ...shot,
                        comments: updatedComments
                    }
                    await updateDoc(shotRef, updatedShot)
                } catch(e) {
                    
                }
            }
        }
    }
    const items: MenuProps['items'] = [
        {
            key: 0,
            label: "Удалить",
            disabled: !user || user.uid !== authorId,
            danger: true,
            icon: <BiTrashAlt size={13} className='inline' />,
            onClick: () => removeComment()
        }
    ]
    return (
        <div className='flex flex-col w-full gap-2 p-2 border h-fit shrink-0 rounded-xl border-neutral-700'>
            <div className="flex items-center justify-between w-full h-fit">
                <CommentAuthor mini authorId={comment.authorId} createdAt={comment.createdAt} />
                <Dropdown menu={{items}}><Button size='small' type='text'><BiDotsVerticalRounded size={15} /></Button></Dropdown>
            </div>
            <span className='text-xs text-neutral-300'>{comment.text}</span>
        </div>
    )
}

export default CommentReply