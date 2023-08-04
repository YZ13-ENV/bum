import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import { ImageBlock } from '@/types'
import { Button } from 'antd'
import React, { memo } from 'react'
import { BiImage, BiTrashAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks } from '../../shotUploader/store'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '@/utils/app'

type Props = {
    block: ImageBlock
    index: number
}
const ImageBlock = ({ block, index }: Props) => {
    const dispatch = useAppDispatch()
    const blocks = useAppSelector(state => state.uploader.shot.blocks)
    const deleteBlock = async() => {
        const filteredBlocks = blocks.filter((_, blockIndex) => blockIndex !== index)
        const imageRef = ref(storage, block.link)
        await deleteObject(imageRef)
        dispatch(setBlocks(filteredBlocks))
    }
    return (
        <div className="relative w-full h-56 border shrink-0 rounded-xl border-neutral-700 bg-neutral-950">
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

export default memo(ImageBlock)