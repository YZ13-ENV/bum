import { TextBlock } from '@/types'
import { Button } from 'antd'
import React from 'react'
import { BiGridVertical, BiTrashAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks } from '../../shotUploader/store'

type Props = {
    block: TextBlock
    index: number
}
const TextBlock = ({ block, index }: Props) => {
    const dispatch = useAppDispatch()
    const blocks = useAppSelector(state => state.uploader.shot.blocks)
    const deleteBlock = () => {
        const filteredBlocks = blocks.filter((_, blockIndex) => blockIndex !== index)
        dispatch(setBlocks(filteredBlocks))
    }
    return (
        <div className="flex items-center justify-between w-full p-2 bg-black border h-fit rounded-xl border-neutral-800">
            <div className="flex items-center w-full gap-2 h-fit">
                {/* <BiGridVertical size={17} /> */}
                <span  
                className="text-sm text-neutral-300">
                    {block.text}
                </span>
            </div>
            <Button onClick={deleteBlock} danger type='text'><BiTrashAlt size={17} /></Button>
        </div>
    )
}

export default TextBlock