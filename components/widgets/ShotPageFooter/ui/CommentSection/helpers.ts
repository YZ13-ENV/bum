import { getHost } from "@/helpers/getHost";
import { CommentBlock, Reaction } from "@/types";
import { uniq } from "lodash";

export type GroupedReactions = {
    key: string
    emoji: string
    uids: string[]
    length: number
}
export const groupReactions = (reactions: Reaction[] | undefined) => {
    if (!reactions) return []
    const groupedReactions: GroupedReactions[] = []
    reactions.forEach(reaction => {
        const indexOfGroup = groupedReactions.findIndex(react => react.key === reaction.reaction.key)
        if (indexOfGroup > -1) {
            groupedReactions[indexOfGroup].length += 1
            groupedReactions[indexOfGroup].uids = uniq([...groupedReactions[indexOfGroup].uids, reaction.uid])
        } else {
            const group: GroupedReactions = {
                emoji: reaction.reaction.emoji,
                key: reaction.reaction.key,
                uids: [reaction.uid],
                length: 1
            }
            groupedReactions.push(group)
        }
    })
    return groupedReactions
}
export const patchComment = async(comment: CommentBlock, authorId: string, shotId: string): Promise<boolean> => {
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