import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft.store'
import { ImageBlock, ShotGridBlock, TextBlock } from '@/types'
import { BiImage, BiText } from 'react-icons/bi'
import { LuGalleryThumbnails } from 'react-icons/lu'

const BlocksIn = () => {
    const isSubscriber = useAppSelector(state => state.user.isSubscriber)
    const dispatch = useAppDispatch()
    const draft = useAppSelector(state => state.uploader.draft)
    const imageBlocks = draft.blocks.filter(block => block.type === 'image')
    const carouselBlocks = draft.blocks.filter(block => block.type === 'shotGrid')
    const mediaBlocksLimit = (isSubscriber ? 10 : 5)
    const gridBlockLimit = isSubscriber ? 5 : 0
    const addBlock = (type: TextBlock['type'] | ImageBlock['type'] | ShotGridBlock['type']) => {
        if (type === 'text') {
            const templateTextBlock: TextBlock = {
                type: 'text',
                align: 'left',
                isBold: false,
                isItalic: false,
                size: 1,
                text: ''
            }
            dispatch(setBlocks([...draft.blocks, templateTextBlock]))
        }
        if (type === 'image') {
            const templateImageBlock: ImageBlock = {
                type: 'image',
                link: ''
            }
            dispatch(setBlocks([...draft.blocks, templateImageBlock]))
        }
        if (type === 'shotGrid') {
            const templateGridBlock: ShotGridBlock = {
                type: 'shotGrid',
                title: '',
                ids: []
            }
            dispatch(setBlocks([...draft.blocks, templateGridBlock]))
        }
    }
    return (
        <div className='grid w-full h-full grid-cols-2 grid-rows-5 gap-4'>
            <div onClick={() => addBlock('text')} 
            className="flex flex-col items-center justify-center w-full h-full gap-2 border rounded-xl border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
                <BiText size={27} />
                <span className='text-xs'>Текст</span>
            </div>
            <div onClick={() => imageBlocks.length + 1 < mediaBlocksLimit ? addBlock('image') : null} 
            className="flex flex-col items-center justify-center w-full h-full gap-2 border rounded-xl border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
                <BiImage size={27} />
                <span className='text-xs'>{isSubscriber ? 'Видео/Картинка' : 'Картинка'}</span>
                <span className='text-xs text-neutral-500'>{imageBlocks.length + 1}/{isSubscriber ? 10 : 5}</span>
            </div>
            {
                isSubscriber &&
                <div onClick={() => carouselBlocks.length < gridBlockLimit ? addBlock('shotGrid') : null}
                className="flex flex-col items-center justify-center w-full h-full gap-2 border rounded-xl border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
                    <LuGalleryThumbnails size={27} />
                    <span className='text-xs'>Карусель</span>
                    <span className='text-xs text-neutral-500'>{carouselBlocks.length}/{gridBlockLimit}</span>
                </div>
            }
        </div>
    )
}

export default BlocksIn