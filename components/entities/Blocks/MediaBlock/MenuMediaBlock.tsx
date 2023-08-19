import BlockImage from '@/components/widgets/Blocks/BlockImage'
import { ImageBlock } from '@/types'
import { storage } from '@/utils/app'
import { Button } from 'antd'
import { ref, deleteObject } from 'firebase/storage'
import React from 'react'
import { BiTrashAlt, BiImage } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks } from '../../uploader/draft.store'

type Props = {
    block: ImageBlock
    index: number
}
const MenuMediaBlock = ({ block, index }: Props) => {
    const dispatch = useAppDispatch()
    const draft = useAppSelector(state => state.uploader.draft)
    const deleteBlock = async() => {
        const filteredBlocks = draft.blocks.filter((_, blockIndex) => blockIndex !== index)
        const imageRef = ref(storage, block.link)
        await deleteObject(imageRef)
        dispatch(setBlocks(filteredBlocks))
    }
    return (
        <div className="relative w-full border aspect-video h-fit shrink-0 rounded-xl border-neutral-700 bg-neutral-950">
            <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-2 h-fit">
                <Button onClick={deleteBlock} danger className='!px-2'><BiTrashAlt size={17} /></Button>
            </div>
            {
                block.link !== '' ? <BlockImage imageLink={block.link} />
                : <div className='flex items-center justify-center w-full h-full'><BiImage size={37} className='text-neutral-400' /></div>
            }
        </div>
    )
}

export default MenuMediaBlock