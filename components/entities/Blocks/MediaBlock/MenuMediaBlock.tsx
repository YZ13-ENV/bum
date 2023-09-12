import { ImageBlock, VideoBlock } from '@/types'
import { Button } from 'antd'
import { BiTrashAlt, BiImage, BiVideo } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks } from '../../uploader/draft.store'
import { getHost } from '@/helpers/getHost'
import BlockVideo from '../ViewBlocks/BlockVideo'
import BlockImage from '../ViewBlocks/BlockImage'

type Props = {
    block: ImageBlock | VideoBlock
    index: number
}
const MenuMediaBlock = ({ block, index }: Props) => {
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
        <div className="relative w-full border aspect-[4/3] h-fit shrink-0 rounded-xl border-neutral-700 bg-neutral-950">
            <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-2 h-fit">
                <Button onClick={deleteBlock} danger className='!px-2'><BiTrashAlt size={17} /></Button>
            </div>
            {
                block.link !== '' && block.type === 'image' ? <BlockImage imageLink={block.link} />
                : block.type === 'video' ? <BlockVideo block={block} />
                : <div className='flex items-center justify-center w-full h-full'>
                    {
                        block.type === 'image'
                        ? <BiImage size={37} className='text-neutral-400' />
                        : <BiVideo size={37} className='text-neutral-400' />
                    }
                </div>
            }
        </div>
    )
}

export default MenuMediaBlock