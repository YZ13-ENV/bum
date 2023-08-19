'use client'
import TextArea from '@/components/shared/ui/TextArea'
import { DocShotData } from '@/types'
import { auth } from '@/utils/app'
import { Button } from 'antd'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
    shot: DocShotData
}
const CommentSection = ({ shot }: Props) => {
    const [user] = useAuthState(auth)
    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
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
                    <Button type='primary'>Отправить</Button>
                </div>
            </div>
        </div>
    )
}

export default CommentSection