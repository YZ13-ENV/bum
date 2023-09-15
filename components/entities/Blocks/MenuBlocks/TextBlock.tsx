import { TextBlock } from '@/types'
import { Button } from 'antd'
import { BiTrashAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks } from '../../uploader/draft.store'
import TextLine from '../ViewBlocks/TextLine'

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
            <div className="flex flex-col w-full h-fit">
                {/* <BiGridVertical size={17} /> */}
                    {block.text.split('\n').map(line => <TextLine key={'menu-line' + line} align='text-start' line={line} />) || 'Текст блока'}
            </div>
            <Button onClick={deleteBlock} danger type='text'><BiTrashAlt size={17} /></Button>
        </div>
    )
}

export default TextBlock