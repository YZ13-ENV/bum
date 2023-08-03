import { TextBlock } from '@/types'
import { Button } from 'antd'
import React from 'react'
import { BiGridVertical, BiTrashAlt } from 'react-icons/bi'

type Props = {
    block: TextBlock
}
const TextBlock = ({ block }: Props) => {
    return (
        <div className="flex items-center justify-between w-full p-2 border h-fit rounded-xl border-neutral-800">
            <div className="flex items-center w-full gap-2 h-fit">
                <BiGridVertical size={17} />
                <span  
                className="text-sm text-neutral-300">
                    {block.text}
                </span>
            </div>
            <Button danger type='text'><BiTrashAlt size={17} /></Button>
        </div>
    )
}

export default TextBlock