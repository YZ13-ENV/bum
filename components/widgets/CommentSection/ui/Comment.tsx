import { CommentBlock } from '@/types'
import React from 'react'
import CommentAuthor from './CommentAuthor'
import { Button, Dropdown, MenuProps } from 'antd'
import { BiDotsVerticalRounded, BiHeart, BiReply, BiTrashAlt } from 'react-icons/bi'

type Props = {
    comment: CommentBlock
}
const Comment = ({ comment }: Props) => {
    const items: MenuProps['items'] = [
        {
            key: 0,
            label: "Удалить",
            danger: true,
            icon: <BiTrashAlt size={13} className='inline' />
        }
    ]
    return (
        <div className='flex flex-col w-full gap-2 p-2 border h-fit shrink-0 rounded-xl border-neutral-700'>
            <div className="flex items-center justify-between w-full h-fit">
                <CommentAuthor authorId={comment.authorId} createdAt={comment.createdAt} />
                <Dropdown menu={{items}}><Button size='small' type='text'><BiDotsVerticalRounded size={15} /></Button></Dropdown>
            </div>
            <span className='text-sm text-neutral-300'>{comment.text}</span>
            <div className="flex items-center w-full gap-2 pt-2 border-t h-fit border-neutral-800">
                <Button disabled size='small'><BiHeart size={15} /></Button>
                <Button disabled size='small'><BiReply size={15} /></Button>
            </div>
        </div>
    )
}

export default Comment