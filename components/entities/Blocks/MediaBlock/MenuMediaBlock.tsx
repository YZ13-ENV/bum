import { ImageBlock, Thumbnail, VideoBlock } from '@/types'
import { Button } from 'antd'
import { BiTrashAlt, BiImage, BiVideo, BiLock } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks } from '../../uploader/draft.store'
import { getHost } from '@/helpers/getHost'
// import BlockVideo from '../ViewBlocks/BlockVideo'
// import BlockImage from '../ViewBlocks/BlockImage'

type Props = {
    block: ImageBlock | VideoBlock | Thumbnail
    index: number
    disabled?: boolean
}
const MenuMediaBlock = ({ disabled=false, block, index }: Props) => {
    const dispatch = useAppDispatch()
    const draft = useAppSelector(state => state.uploader.draft)
    const deleteBlock = async() => {
        const filteredBlocks = draft.blocks.filter((_, blockIndex) => blockIndex !== index)
        dispatch(setBlocks(filteredBlocks))
        try {
            const url = `${getHost()}/files/file?link=${block.link}`
            await fetch(url, { method: 'DELETE' })
        } catch(e) {

        }
    }
    return (
        <div className="flex items-center justify-between w-full h-12 gap-2 p-2 bg-black border rounded-xl group border-neutral-800">
            <div className="flex items-center h-full gap-2 w-fit">
                <div className="w-1 h-full transition-colors bg-transparent rounded-full group-hover:bg-white" />
                { block.link.includes('.mp4') ? <BiVideo size={21}/> : <BiImage size={21} /> }
                <span className='text-sm select-none text-neutral-300'>{ block.link.includes('.mp4') 
                ? 'Видео' : 'Картинка' }</span>
            </div>
            {
                disabled
                ? <BiLock size={17} className='mr-2 text-neutral-400' />
                : <div className='items-center hidden h-full gap-2 w-fit group-hover:flex'>
                    <Button onClick={deleteBlock} danger className='!px-2'><BiTrashAlt size={17} /></Button>
                </div>
            }
        </div>
    )
}

export default MenuMediaBlock