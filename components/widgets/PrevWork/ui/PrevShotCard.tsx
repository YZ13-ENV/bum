'use client'
import React, { useState } from 'react'
import { DocDraftShotData } from '@/types'
import { useAppDispatch } from '@/components/entities/store/store'
import { BiRightArrowAlt, BiTrashAlt } from 'react-icons/bi'
import { Button } from 'antd'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import { setDraftId } from '@/components/entities/uploader/modal.store'
import { setDraft } from '@/components/entities/uploader/draft.store'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { getHost } from '@/helpers/getHost'

type Props = {
    block: DocDraftShotData
}
const PrevShotCard = ({ block }: Props) => {
    const dispatch = useAppDispatch()
    const [disabled, setDisabled] = useState(false)
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const editDraft = () => {
        dispatch(setDraftId(block.doc_id))
        dispatch(setDraft({
            blocks: block.blocks,
            rootBlock: block.rootBlock,
            title: block.title,
            thumbnail: block.thumbnail
        }))
    }
    const deleteDraft = async() => {
        if (user) {
            setLoading(true)
            const res = await fetch(`${getHost()}/shots/shot?userId=${user.uid}&shotId=${block.doc_id}`, { method: "DELETE" })
            if (res.ok) {
                setDisabled(true)
                router.refresh()
            }
            setLoading(false)
        }
    }
    return (
        <div 
        className={`relative aspect-video flex items-center justify-center w-full border ${block.rootBlock.link === '' ? 'h-52' : 'h-fit'} rounded-xl shrink-0 border-neutral-800 bg-neutral-950`}>
            <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full gap-2 p-2 h-fit">
                <Button disabled={disabled} onClick={deleteDraft} loading={loading} className='!px-2' icon={<BiTrashAlt className='inline-block mb-0.5' size={15} />}>Удалить</Button>
                <Button disabled={disabled} className='!px-2' onClick={editDraft}><BiRightArrowAlt size={17} /></Button>
            </div>
            {
                block.thumbnail && block.thumbnail.link !== '' ?
                <MediaBlock {...{link: block.thumbnail.link, type: 'image'}} autoPlay />
                : block.rootBlock.link !== '' ?
                <MediaBlock {...block.rootBlock} autoPlay />
                : <span className='text-xs text-neutral-300'>Нет обложки</span>
            }
        </div>
    )
}

export default PrevShotCard