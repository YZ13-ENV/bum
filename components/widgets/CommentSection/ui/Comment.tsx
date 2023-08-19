import { CommentBlock } from '@/types'
import React from 'react'
import CommentAuthor from './CommentAuthor'
import { Button } from 'antd'
import { BiHeart, BiReply } from 'react-icons/bi'

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
            <div className="flex items-center w-full gap-2 pt-2 border-t h-fit border-neutral-800">
                <Button size='small'><BiHeart size={15} /></Button>
                <Button size='small'><BiReply size={15} /></Button>
            </div>
        </div>
    )
}

export default Comment