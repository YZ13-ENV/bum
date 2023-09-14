import { CommentBlockNoAnswers } from '@/types'
import React from 'react'
import CommentAuthor from './CommentAuthor'

type Props = {
    comment: CommentBlockNoAnswers
}
const CommentReply = ({ comment }: Props) => {
    return (
        <div className='flex flex-col w-full gap-2 p-2 border h-fit shrink-0 rounded-xl border-neutral-700'>
            <div className="flex items-center justify-start w-full h-fit">
                <CommentAuthor mini authorId={comment.authorId} createdAt={comment.createdAt} />
                {/* <Dropdown menu={{items}}><Button size='small' type='text'><BiDotsVerticalRounded size={15} /></Button></Dropdown> */}
            </div>
            <span className='text-xs text-neutral-300'>{comment.text}</span>
        </div>
    )
}

export default CommentReply