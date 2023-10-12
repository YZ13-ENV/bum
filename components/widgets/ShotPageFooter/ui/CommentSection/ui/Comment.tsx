import { CommentBlock } from '@/types'
import CommentAuthor from './CommentAuthor'
import { Button, Popover } from 'antd'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { getHost } from '@/helpers/getHost'
import NewReply from './NewReply'
import CommentReply from './CommentReply'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { useState } from 'react'
import Reactions from './Reactions'
import { emojiArrayMap } from '../const'
import { addReaction } from '../helpers'
import { useAppSelector } from '@/components/entities/store/store'

type Props = {
    shotAuthor: string
    shotId: string
    comment: CommentBlock
}
const Comment = ({ comment, shotAuthor, shotId }: Props) => {
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const [wantReply, setWantReply] = useState<boolean>(false)
    const [showAll, setShowAll] = useState<boolean>(false)
    const removeComment = async() => {
        const fetchUrl = `${getHost()}/shots/comment?userId=${shotAuthor}&shotId=${shotId}&commentId=${comment.id}`
        await fetch(fetchUrl, { 'method': 'DELETE' })
    }
    const mainItems = (
        <div className="flex flex-col gap-2 w-52 h-fit">
            {
                !isSub &&
                <div className="flex flex-wrap items-center justify-between w-full gap-1 overflow-x-auto h-fit">
                    { emojiArrayMap.map(emoji => <span onClick={() => addReaction(user, shotAuthor, shotId, comment, emoji)} className='px-2 py-1 text-base rounded-md cursor-pointer hover:bg-neutral-900' 
                    key={emoji.key}>{emoji.emoji}</span>) }
                </div>
            }
            <Button onClick={() => setWantReply(!wantReply)} type='text'>Ответить</Button>
            { user && user.uid === shotAuthor && <Button onClick={removeComment} type='text'>Удалить</Button> }
        </div>
    )
    return (
        <>
            <div className='flex flex-col w-full gap-2 p-2 bg-black border h-fit shrink-0 rounded-xl border-neutral-700'>
                <Popover content={mainItems} trigger={['click', 'contextMenu']} placement='left'>
                <div className="flex flex-col w-full gap-2 cursor-pointer h-fit">
                    <div className="flex items-center justify-start w-full h-fit">
                        <CommentAuthor authorId={comment.authorId} createdAt={comment.createdAt} />
                    </div>
                    <span className='text-sm text-neutral-300'>{comment.text}</span>
                </div>
                </Popover>
                <div className="flex flex-col w-full gap-2 h-fit">
                    <Reactions reactions={comment.reactions} comment={comment} shotAuthor={shotAuthor} shotId={shotId} />
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
        </>
    )
}

export default Comment