import React from 'react'
import BlockImage from '../../UploadBlockView/ui/BlockImage'
import { DocDraftShotData, DocShotData } from '@/types'
import { useAppDispatch } from '@/components/entities/store/store'
import { setDraftId, setShot } from '@/components/entities/uploader/store'
import { BiRightArrowAlt } from 'react-icons/bi'
import { Button } from 'antd'
import BlockVideo from '../../UploadBlockView/ui/BlockVideo'

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
            title: block.title
        }))
    }
    return (
        <div 
        className="relative flex items-center justify-center w-full border h-52 rounded-xl shrink-0 border-neutral-800 bg-neutral-950">
            <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-2 h-fit">
                <Button className='!px-2' onClick={setDraft}><BiRightArrowAlt size={17} /></Button>
            </div>
            {
                block.rootBlock.link === ''
                ? <span className='text-xs text-neutral-300'>Нет обложки</span>
                : block.rootBlock.type === 'image' 
                ? <BlockImage imageLink={block.rootBlock.link} />
                : <BlockVideo block={block.rootBlock} />
            }
        </div>
    )
}

export default PrevShotCard