import React from 'react'
import { Button, Popover } from 'antd'
import { LuSmilePlus } from 'react-icons/lu'
import { emojiArrayMap } from '../const'
import { CommentBlock, Reaction } from '@/types'
import { DateTime } from 'luxon'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { getHost } from '@/helpers/getHost'
import { useAppSelector } from '@/components/entities/store/store'
// import { doc, getDoc } from 'firebase/firestore'
// import { db } from '@/utils/app'

type Props = {
    shotAuthor: string
    shotId: string
    comment: CommentBlock
    reactions: CommentBlock['reactions']
}
const patchComment = async(comment: CommentBlock, authorId: string, shotId: string): Promise<boolean> => {
    try {
        const headers = new Headers()
        headers.set("Content-Type", "application/json")
        const url = `${getHost()}/shots/comment?userId=${authorId}&shotId=${shotId}`
        const res = await fetch(url, { method: 'PATCH', headers: headers, body: JSON.stringify(comment) })
        if (res.ok) return Boolean(await res.json())
        return false
    } catch(e) {
        return false
    }
}
const Reaction = ({ comment, shotAuthor, shotId, reactions }: Props) => {
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const isHaveReaction = user && reactions ? reactions.findIndex(react => react.uid === user.uid) > -1 : false
    const addReaction = async(emojiMap: { key: string, emoji: string }) => {
        if (user) {
            const reaction: Reaction = {
                createdAt: DateTime.now().toSeconds(),
                reaction: emojiMap,
                uid: user.uid
            }
            if (comment.reactions) {
                const updatedComment = {
                    ...comment,
                    reactions: [...comment.reactions, reaction]
                }
                await patchComment(updatedComment, shotAuthor, shotId)
            } else {
                const updatedComment = {
                    ...comment,
                    reactions: [reaction]
                }
                await patchComment(updatedComment, shotAuthor, shotId)
            }
        }
        // const shotRef = doc(db, 'users', shotAuthor, 'shots', shotId)
        // const shotSnap = await getDoc(shotRef)
    }
    const content = (
        <div className="flex items-center h-10 gap-1 w-fit">
            { emojiArrayMap.map(emoji => <span onClick={() => addReaction(emoji)} className='px-2 py-1 text-base rounded-md cursor-pointer hover:bg-neutral-900' 
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