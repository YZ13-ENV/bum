import { ShotGridBlock } from '@/types'
import { Button } from 'antd'
import React from 'react'
import { BiLock, BiTrashAlt } from 'react-icons/bi'
import { LuGalleryThumbnails } from 'react-icons/lu'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks } from '../../uploader/draft.store'
import { getHost } from '@/helpers/getHost'


type Props = {
    block: Partial<ShotGridBlock>
    index: number
    disabled?: boolean
}
const ShotsGridBlock = ({ block, index, disabled }: Props) => {
    const dispatch = useAppDispatch()
    const draft = useAppSelector(state => state.uploader.draft)
    const removeImage = async(index: number) => {
        if (block.ids) await fetch(`${getHost()}/files/file?link=${block.ids[index]}`, { method: "DELETE" })
    } 
    const deleteBlock = () => {
        if (block.ids && block.ids.length !== 0) {
            block.ids.forEach((_, indexOfId) => removeImage(indexOfId))
            const filteredBlocks = draft.blocks.filter((_, blockIndex) => blockIndex !== index)
            dispatch(setBlocks(filteredBlocks))
        } else {
            const filteredBlocks = draft.blocks.filter((_, blockIndex) => blockIndex !== index)
            dispatch(setBlocks(filteredBlocks))
        }
    }
    return (
        <div className="flex items-center justify-between w-full h-12 gap-2 p-2 bg-black border rounded-xl group border-neutral-800">
            <div className="flex items-center h-full gap-2 shrink-0 w-fit">
                <div className="w-1 h-full transition-colors bg-transparent rounded-full group-hover:bg-white" />
                <LuGalleryThumbnails size={21} />
                <span className='text-sm select-none line-clamp-1 text-neutral-300'>Карусель</span>
            </div>
            {   disabled 
                ? <BiLock size={17} className='mr-2 text-neutral-400' />
                : <div className='items-center hidden h-full gap-2 w-fit group-hover:flex'>
                    <Button onClick={deleteBlock} danger className='!px-2'><BiTrashAlt size={17} /></Button>
                </div>
            }
        </div>
    )
}

export default ShotsGridBlock