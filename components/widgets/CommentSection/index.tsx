'use client'
import TextArea from '@/components/shared/ui/TextArea'
import { CommentBlock, DocShotData } from '@/types'
import { auth } from '@/utils/app'
import { Button } from 'antd'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import CommentsList from './ui/CommentsList'
import { getHost } from '@/helpers/getHost'

type Props = {
    shot: DocShotData
}
const CommentSection = ({ shot }: Props) => {
    const [user] = useAuthState(auth)
    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const addComment = async() => {
        if (user && text.length !== 0) {
            setLoading(true)
            const comment: CommentBlock = {
                'authorId': user.uid,
                'text': text,
                'createdAt': DateTime.now().toSeconds(),
                'answers': []
            }
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            try {
                const res = await fetch(`${getHost()}/shots/addComment?userId=${shot.authorId}&shotId=${shot.doc_id}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(comment)
                })
                if (res.ok) {
                    const isAdded = await res.json()
                    if (isAdded) {
                        setText('')
                    }
                    setLoading(false)
                } else setLoading(false)
            } catch(e) {
                console.log(e)
                setLoading(false)
            }

        }
    }
    if (!shot.needFeedback) {
        return (
            <div className='flex items-center justify-center w-full h-36'>
                <span className='text-sm text-neutral-400'>Комментарии отключены</span>
            </div>
        )
    }
    return (
        <div className='flex flex-col w-full gap-4 h-fit'>
            <div className="flex flex-col w-full justify-between gap-2 p-2 border min-h-[9rem] rounded-xl border-neutral-800">
                <TextArea setText={text => setText(text)} text={text} placeholder='Что хотите сказать?' className='text-sm' />
                <div className="flex items-center justify-end w-full h-fit">
                    <Button onClick={addComment} disabled={text.length < 2} loading={loading} type='primary'>Отправить</Button>
                </div>
            </div>
            <CommentsList authorId={shot.authorId} shotId={shot.doc_id} commentsList={shot.comments} />
        </div>
    )
}

export default CommentSection