import { Reaction } from "@/types";
import { uniq } from "lodash";

type GroupedReactions = {
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