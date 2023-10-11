import React from 'react'
import { Button, Popover } from 'antd'
import { LuSmilePlus } from 'react-icons/lu'
import { emojiArrayMap } from '../const'
import { CommentBlock } from '@/types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { addReaction } from '../helpers'
import { useAppSelector } from '@/components/entities/store/store'

type Props = {
    shotAuthor: string
    shotId: string
    comment: CommentBlock
    reactions: CommentBlock['reactions']
}

const Reaction = ({ comment, shotAuthor, shotId, reactions }: Props) => {
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const isHaveReaction = user && reactions ? reactions.findIndex(react => react.uid === user.uid) > -1 : false

    const content = (
        <div className="flex items-center h-10 gap-1 w-fit">
            { emojiArrayMap.map(emoji => <span onClick={() => addReaction(user, shotAuthor, shotId, comment, emoji)} className='px-2 py-1 text-base rounded-md cursor-pointer hover:bg-neutral-900' 
            key={emoji.key}>{emoji.emoji}</span>) }
        </div>
    )
    if (!isSub) return null
    return (
        <Popover content={content} trigger={['click']}>
            <Button disabled={process.env.NODE_ENV === 'development' ? !user : !user || isHaveReaction} type='text'><LuSmilePlus /></Button>
        </Popover>

    )
}

export default Reaction