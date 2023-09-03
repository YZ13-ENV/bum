'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { Button } from 'antd'
import React from 'react'
import { BiX } from 'react-icons/bi'
import PreviewSide from './ui/PreviewSide'
import DraftConfig from './ui/DraftConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { ShotData } from '@/types'
import { DateTime } from 'luxon'
import { useRouter } from 'next/navigation'
import { uploadDraft_POST } from '@/helpers/shot'
import { setFinalTouchModal, setDraftId } from '@/components/entities/uploader/modal.store'
import { setDraft } from '@/components/entities/uploader/draft.store'
import ModalWrapper from './ui/ModalWrapper'
import ModalHeader from './ui/ModalHeader'

const FinalTouchModal = () => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const finalModal = useAppSelector(state => state.uploader.modals.finalTouchModal)
    const draft = useAppSelector(state => state.uploader.draft) 
    const draftId = useAppSelector(state => state.uploader.modals.draftId)
    const [tags, setTags] = React.useState<string[]>([])
    const [needFeedback, setNeedFeedback] = React.useState<boolean>(true)
    const [loading, setLoading] = React.useState<boolean>(false)
    const uploadDraft = async() => {
        if (user && draftId) {
            setLoading(true)
            const preparedBlocks = draft.blocks.filter((block => {
                if (block.type === 'image') {
                    if (block.link === '') return false
                    return true
                }
                if (block.type === 'text') {
                    if (block.text === '') return false
                    return true
                }
                return false
            }))
            const preparedDraft: ShotData = {
                ...draft,
                blocks: preparedBlocks,
                authorId: user.uid,
                isDraft: false,
                needFeedback: needFeedback,
                comments: [],
                createdAt: DateTime.now().toSeconds(),
                likes: [],
                tags: tags,
                views: [],
            }
            const isOk = await uploadDraft_POST(user.uid, draftId, preparedDraft)
            if (isOk) {
                setLoading(false)
                setTags([])
                setNeedFeedback(true)
                dispatch(setFinalTouchModal(false))
                dispatch(setDraftId(null))
                dispatch(setDraft({ blocks: [], rootBlock: { link: '', type: 'image' }, thumbnail: null, title: '' }))
                router.push(`/${user.uid}/${draftId}`)
            } else setLoading(false)
        }
    }
    if (!finalModal) return null
    return (
        <ModalWrapper>
            <div onClick={e => e.stopPropagation()} 
            className="flex flex-col w-full max-w-4xl gap-3 p-3 border h-3/4 rounded-xl shrink-0 border-neutral-800 bg-neutral-950">
                <ModalHeader />
                <div className="flex flex-col items-start w-full h-full gap-4 md:flex-row">
                    <PreviewSide />
                    <div className="w-0.5 h-full md:inline hidden bg-neutral-800" />
                    <DraftConfig uploadDraft={uploadDraft} loading={loading}
                    tags={tags} setTags={setTags} needFeedback={needFeedback} setNeedFeedback={setNeedFeedback} />
                </div>
            </div>
        </ModalWrapper>
    )
}

export default FinalTouchModal