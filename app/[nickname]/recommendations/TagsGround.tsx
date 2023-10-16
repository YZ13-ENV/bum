'use client'

import { auth, db } from "@/utils/app"
import { useDebounceEffect } from "ahooks"
import { Button, Input } from "antd"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { isEqual } from "lodash"
import { useEffect, useLayoutEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

type Props = {
    tags: string[]
}
const TagsGround = ({ tags }: Props) => {
    const [user] = useAuthState(auth)
    const [selectedTags, selectTag] = useState<string[]>([])
    const noMoreTags = selectedTags.length === 10
    const [removeNotSelected, setRemoveNotSelected] = useState<boolean>(false)
    const [filterTag, setFilterTag] = useState<string>("")
    const applyRecommendationTags = async() => {
        if (user) {
            const refTo = doc(db, 'users', user.uid)
            const userData = await getDoc(refTo)
            const recommendations = userData.get('recommendationTags') as string[] | undefined
            if (!recommendations) await updateDoc(refTo, { ...userData.data(), recommendationTags: selectedTags })
            if (recommendations) {
                const isSame = isEqual(selectedTags, recommendations)
                if (!isSame) await updateDoc(refTo, { ...userData.data(), recommendationTags: selectedTags })
            }
        }
    }
    const getRecommendationTags = async() => {
        if (user) {
            const refTo = doc(db, 'users', user.uid)
            const userData = await getDoc(refTo)
            const recommendations = userData.get('recommendationTags') as string[] | undefined
            if (!recommendations) await updateDoc(refTo, { ...userData.data(), recommendationTags: [] })
            if (recommendations) selectTag(recommendations)
        }
    }
    useEffect(() => {
        if (user) getRecommendationTags()
    },[user])
    useDebounceEffect(() => {
        if (noMoreTags) setRemoveNotSelected(true)
        if (!noMoreTags) setRemoveNotSelected(false)
    },[noMoreTags], { wait: 2000 })
    useLayoutEffect(() => {
        if (user) applyRecommendationTags()
    },[selectedTags, user])
    return (
        <div className="flex flex-col w-full gap-2 h-fit">
            <Input className="max-w-md !mx-auto" size="large" value={filterTag} onChange={e => setFilterTag(e.target.value)} placeholder="Фильтрация по тэгам" />
            <div className="flex items-center justify-between w-full h-fit">
                <span className={`text-sm ${selectedTags.length === 0 ? 'text-neutral-400' : 'text-neutral-200'}`}>Выбрано: {selectedTags.length} (макс. 10)</span>
                <Button type={selectedTags.length === 0 ? 'default' : 'primary'} onClick={() => selectTag([])}>Очистить</Button>
            </div>
            <div className="flex flex-row flex-wrap w-full gap-2 h-fit">
                { 
                    tags
                    .sort()
                    .filter(tag => removeNotSelected ? selectedTags.includes(tag) : filterTag.length !== 0 ? tag.includes(filterTag) : tag)
                    .map(tag => <span key={tag} onClick={() => !noMoreTags && !selectedTags.includes(tag) ? (selectedTags.includes(tag) ? selectTag(selectedTags.filter(t => t !== tag)) : selectTag([...selectedTags, tag])) : selectTag(selectedTags.filter(t => t !== tag))}
                    className={`px-3 py-1 text-sm border rounded-lg w-fit cursor-pointer transition-colors duration-500
                    ${noMoreTags && !selectedTags.includes(tag) ? 'text-neutral-600 border-transparent' : selectedTags.includes(tag) ? 'text-black bg-white border-white' : 'text-neutral-400 bg-neutral-900 border-neutral-800'}`}>{tag}</span>) 
                }
            </div>
        </div>
    )
}
export default TagsGround