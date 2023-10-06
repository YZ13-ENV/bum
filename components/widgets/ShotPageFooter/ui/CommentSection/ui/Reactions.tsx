import { CommentBlock } from '@/types'
import React from 'react'
import { groupReactions, patchComment } from '../helpers'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { largeNumber } from '@/helpers/largeNumbers'

type Props = {
    shotAuthor: string
    shotId: string
    comment: CommentBlock
    reactions: CommentBlock['reactions']
}
const Reactions = ({ reactions, comment, shotAuthor, shotId }: Props) => {
    const grouped = groupReactions(reactions)
    const [user] = useAuthState(auth)
    const removeReaction = async() => {
        if (reactions && user) {
            const indexOfReaction = reactions.findIndex(react => react.uid === user.uid)
            const filteredReactions = reactions.filter((_, index) => indexOfReaction > -1 ? indexOfReaction !== index : _ )
            const updatedComment: CommentBlock = {
                ...comment,
                reactions: filteredReactions
            }
            await patchComment(updatedComment, shotAuthor, shotId)
        }
    }
    if (!reactions || reactions.length === 0) return null
    return (
        <div className='flex flex-wrap w-full gap-2 h-fit'>{
            grouped.map(reaction => {
            const haveReaction = user ? reaction.uids.includes(user.uid) : false
            return <span onClick={() => haveReaction && removeReaction()} className={`px-2 py-0.5 text-xs cursor-pointer rounded-full transition-colors ${haveReaction ? 'bg-neutral-100 text-black' : 'text-neutral-200 border border-neutral-800 bg-neutral-900'}`} key={reaction.key + reaction.emoji}>{reaction.emoji} {largeNumber(reaction.length)}</span>
        })
        }</div>
    )
}

export default Reactions