import { TextBlock } from '@/types'
import { Button } from 'antd'
import { BiTrashAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks } from '../../uploader/draft.store'

type Props = {
    block: TextBlock
    index: number
}
const TextBlock = ({ block, index }: Props) => {
    const dispatch = useAppDispatch()
    const draft = useAppSelector(state => state.uploader.draft)
    const deleteBlock = () => {
        const filteredBlocks = draft.blocks.filter((_, blockIndex) => blockIndex !== index)
        dispatch(setBlocks(filteredBlocks))
    }
    return (
        <div className="flex items-center justify-between w-full p-2 bg-black border h-fit rounded-xl border-neutral-800">
            <div className="flex items-center w-full gap-2 h-fit">
                {/* <BiGridVertical size={17} /> */}
                <span  
                className="text-sm text-neutral-300">
                    {block.text || 'Текст блока'}
                </span>
            </div>
            <Button onClick={deleteBlock} danger type='text'><BiTrashAlt size={17} /></Button>
        </div>
    )
}

export default TextBlock