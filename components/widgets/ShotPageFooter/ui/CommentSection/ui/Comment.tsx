import { CommentBlock } from '@/types'
import CommentAuthor from './CommentAuthor'
import { Button, Dropdown, MenuProps } from 'antd'
import { BiChevronDown, BiChevronUp, BiDotsVerticalRounded, BiTrashAlt } from 'react-icons/bi'
import { getHost } from '@/helpers/getHost'
import NewReply from './NewReply'
import CommentReply from './CommentReply'
import { LuSmilePlus } from 'react-icons/lu'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { useState } from 'react'
import Reaction from './Reaction'
import Reactions from './Reactions'

type Props = {
    shotAuthor: string
    shotId: string
    comment: CommentBlock
}
const Comment = ({ comment, shotAuthor, shotId }: Props) => {
    const [user] = useAuthState(auth)
    const [wantReply, setWantReply] = useState<boolean>(false)
    const [showAll, setShowAll] = useState<boolean>(false)
    const items: MenuProps['items'] = [
        {
            key: 0,
            label: "Удалить",
            danger: true,
            disabled: !user || user.uid !== shotAuthor,
            icon: <BiTrashAlt size={13} className='inline' />,
            onClick: () => removeComment()
        }
    ]
    const removeComment = async() => {
        const fetchUrl = `${getHost()}/shots/comment?userId=${shotAuthor}&shotId=${shotId}&commentId=${comment.id}`
        await fetch(fetchUrl, { 'method': 'DELETE' })
    }
    return (
        <>
            <div className='flex flex-col w-full gap-2 p-2 border h-fit shrink-0 rounded-xl border-neutral-700'>
                <div className="flex items-center justify-between w-full h-fit">
                    <CommentAuthor authorId={comment.authorId} createdAt={comment.createdAt} />
                    <Dropdown menu={{items}}><Button size='small' type='text'><BiDotsVerticalRounded size={15} /></Button></Dropdown>
                </div>
                <span className='text-sm text-neutral-300'>{comment.text}</span>
                <div className="flex flex-col w-full gap-2 h-fit">
                    <Reactions reactions={comment.reactions} />
                    <div className="flex items-center w-full gap-2 h-fit">
                        <Reaction reactions={comment.reactions} comment={comment} shotAuthor={shotAuthor} shotId={shotId} />
                        <div className="inline-flex gap-1 px-3 py-1.5 rounded-md bg-neutral-900 w-fit h-fit"><span className='text-xs text-neutral-300'>{comment.answers.length} Ответов</span></div>
                        <Button onClick={() => setWantReply(!wantReply)} type={wantReply ? 'default' : 'text'}>{wantReply ? 'Отменить' : 'Ответить'}</Button>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col w-full gap-2 p-2 transition-all border-x h-fit ${showAll ? 'border-neutral-700' : 'border-transparent'} `}>
                {
                    comment.answers.filter((_, i) => showAll ? _ : i <= 1).map((reply) => <CommentReply authorId={shotAuthor} 
                    parentCommentId={comment.id} shotId={shotId} key={reply.id} comment={reply} />)
                }
                {
                    (comment.answers.length - 2) <= 0
                    ? null
                    : !showAll
                    ? 
                    <div onClick={() => setShowAll(!showAll)} 
                    className="flex items-center justify-center w-full cursor-pointer h-fit text-neutral-400 hover:text-neutral-200">
                        <BiChevronDown size={15} className='text-inherit' />
                        <span className='text-xs text-inherit'>Показать все ({comment.answers.length - 2})</span>
                    </div>
                    :
                    <div onClick={() => setShowAll(!showAll)} 
                    className="flex items-center justify-center w-full cursor-pointer h-fit text-neutral-400 hover:text-neutral-200">
                        <BiChevronUp size={15} className='text-inherit' />
                        <span className='text-xs text-inherit'>Свернуть</span>
                    </div>
                }
                {
                    wantReply && <NewReply setWantReply={setWantReply} shotAuthor={shotAuthor} shotId={shotId} comment={comment} />
                }
            </div>
            {/* {
                !showAll
                ? <div className='flex flex-col w-full gap-2 h-fit'>
                    {
                        comment.answers.filter((_, i) => i <= 1).map((reply) => <CommentReply authorId={shotAuthor} 
                        parentCommentId={comment.id} shotId={shotId} key={reply.id} comment={reply} />)
                    }
                    { 
                        (comment.answers.length - 2) > 0 &&
                        <div onClick={() => setShowAll(true)} 
                        className="flex items-center justify-center w-full cursor-pointer h-fit text-neutral-400 hover:text-neutral-200">
                            <BiChevronDown size={15} className='text-inherit' />
                            <span className='text-xs text-inherit'>Показать все ({comment.answers.length - 2})</span>
                        </div>
                    }
                </div>
                :
                <div className="flex flex-col w-full gap-2 p-2 border-x h-fit border-neutral-700">
                    <div className="flex flex-col w-full gap-2 h-fit">
                        {comment.answers.map((reply) => <CommentReply authorId={shotAuthor} 
                        parentCommentId={comment.id} shotId={shotId} key={reply.id} comment={reply} />)}
                    </div>
                    <div onClick={() => setShowAll(false)} 
                        className="flex items-center justify-center w-full cursor-pointer h-fit text-neutral-400 hover:text-neutral-200">
                        <BiChevronUp size={15} className='text-inherit' />
                        <span className='text-xs text-inherit'>Свернуть</span>
                    </div>
                    {
                        wantReply && <NewReply setWantReply={setWantReply} shotAuthor={shotAuthor} shotId={shotId} comment={comment} />
                    }
                </div>
            } */}
        </>
    )
}

export default Comment