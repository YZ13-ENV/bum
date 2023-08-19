import { CommentBlock } from '@/types'
import React from 'react'
import CommentAuthor from './CommentAuthor'

type Props = {
    comment: CommentBlock
}
const Comment = ({ comment }: Props) => {
    return (
        <div className='flex flex-col w-full gap-2 p-2 border h-fit shrink-0 rounded-xl border-neutral-700'>
            <div className="flex items-center justify-between w-full h-fit">
                <CommentAuthor authorId={comment.authorId} createdAt={comment.createdAt} />
                <span></span>
            </div>
            <span className='text-sm text-neutral-300'>{comment.text}</span>
        </div>
    )
}

export default Comment