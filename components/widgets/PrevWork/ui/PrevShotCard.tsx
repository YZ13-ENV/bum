'use client'
import React from 'react'
import { DocDraftShotData } from '@/types'
import { useAppDispatch } from '@/components/entities/store/store'
import { BiRightArrowAlt } from 'react-icons/bi'
import { Button } from 'antd'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import { setDraftId, setShot } from '@/components/entities/uploader/store'

type Props = {
    block: DocDraftShotData
}
const PrevShotCard = ({ block }: Props) => {
    const dispatch = useAppDispatch()
    const setDraft = () => {
        dispatch(setDraftId(block.doc_id))
        dispatch(setShot({
            blocks: block.blocks,
            rootBlock: block.rootBlock,
            title: block.title,
            thumbnail: block.thumbnail
        }))
    }
    return (
        <div 
        className={`relative aspect-video flex items-center justify-center w-full border ${block.rootBlock.link === '' ? 'h-52' : 'h-fit'} rounded-xl shrink-0 border-neutral-800 bg-neutral-950`}>
            <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-2 h-fit">
                <Button className='!px-2' onClick={setDraft}><BiRightArrowAlt size={17} /></Button>
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