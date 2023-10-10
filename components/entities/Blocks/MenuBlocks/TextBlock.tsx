import { TextBlock } from '@/types'
import { Button } from 'antd'
import { BiLock, BiText, BiTrashAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks } from '../../uploader/draft.store'

type Props = {
    block: Partial<TextBlock>
    index: number
    disabled?: boolean
}
const TextBlock = ({ block, index, disabled=false }: Props) => {
    const dispatch = useAppDispatch()
    const MdSyntax = useAppSelector(state => state.uploader.modals.enableMDSyntax)
    const draft = useAppSelector(state => state.uploader.draft)
    const deleteBlock = () => {
        const filteredBlocks = draft.blocks.filter((_, blockIndex) => blockIndex !== index)
        dispatch(setBlocks(filteredBlocks))
    }
    return (
        <div className="flex items-center justify-between w-full h-12 gap-2 p-2 bg-black border rounded-xl group border-neutral-800">
            <div className="flex items-center h-full gap-2 shrink-0 w-fit">
                <div className="w-1 h-full transition-colors bg-transparent rounded-full group-hover:bg-white" />
                <BiText size={21} />
                { MdSyntax && <sup className='text-neutral-200'>MD</sup> }
                <span className='text-sm select-none line-clamp-1 text-neutral-300'>{ block?.text || 'Текст' }</span>
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

export default TextBlock