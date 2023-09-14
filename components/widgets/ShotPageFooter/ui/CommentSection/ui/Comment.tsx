import { CommentBlock } from '@/types'
import CommentAuthor from './CommentAuthor'
import { Button, Dropdown, MenuProps } from 'antd'
import { BiDotsVerticalRounded, BiTrashAlt } from 'react-icons/bi'
import { getHost } from '@/helpers/getHost'
import NewReply from './NewReply'
import CommentReply from './CommentReply'

type Props = {
    shotAuthor: string
    shotId: string
    comment: CommentBlock
}
const Comment = ({ comment, shotAuthor, shotId }: Props) => {
    const items: MenuProps['items'] = [
        {
            key: 0,
            label: "Удалить",
            danger: true,
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
            </div>
            <div className="flex flex-col w-full gap-2 h-fit">
                <div className="flex w-full gap-2 h-fit">
                    <div className="flex justify-center h-full px-3 w-fit">
                        <div className="w-0.5 h-full bg-neutral-700" />
                    </div>
                    <div className="flex flex-col w-full h-full gap-2">
                        <div className="flex items-center justify-end w-full h-fit">
                            <div className="flex flex-col w-full gap-2 h-fit">
                                {comment.answers.map((reply) => <CommentReply key={reply.id} comment={reply} />)}
                            </div>
                        </div>
                    </div>
                </div>
                <NewReply shotAuthor={shotAuthor} shotId={shotId} comment={comment} />
            </div>
        </>
    )
}

export default Comment