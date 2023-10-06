import { CommentBlock } from '@/types'
import React from 'react'
import { groupReactions } from '../helpers'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { largeNumber } from '@/helpers/largeNumbers'

type Props = {
    reactions: CommentBlock['reactions']
}
const Reactions = ({ reactions }: Props) => {
    const grouped = groupReactions(reactions)
    const [user] = useAuthState(auth)
    if (!reactions || reactions.length === 0) return null
    return (
        <div className='flex flex-wrap w-full gap-2 h-fit'>{
            grouped.map(reaction => {
            const haveReaction = user ? reaction.uids.includes(user.uid) : false
            return <span className={`px-2 py-0.5 text-xs rounded-full transition-colors ${haveReaction ? 'bg-neutral-100 text-black' : 'text-neutral-200 border border-neutral-800 bg-neutral-900'}`} key={reaction.key + reaction.emoji}>{reaction.emoji} {largeNumber(reaction.length)}</span>
        })
        }</div>
    )
}

export default Reactions