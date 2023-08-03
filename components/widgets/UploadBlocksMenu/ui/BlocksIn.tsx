import { setBlocks } from '@/components/entities/shotUploader/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { ImageBlock, ShotGridBlock, TextBlock } from '@/types'
import React from 'react'
import { BiImage, BiText } from 'react-icons/bi'

const BlocksIn = () => {
    const dispatch = useAppDispatch()
    const blocks = useAppSelector(state => state.uploader.shot.blocks)
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
            dispatch(setBlocks([...blocks, templateTextBlock]))
        }
    }
    return (
        <div className='grid w-full h-full grid-cols-2 grid-rows-5 gap-4'>
            <div onClick={() => addBlock('text')} 
            className="flex flex-col items-center justify-center w-full h-full gap-2 border rounded-xl border-neutral-700 bg-neutral-900 hover:bg-neutral-800">
                <BiText size={27} />
                <span className='text-xs'>Текст</span>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full gap-2 border rounded-xl border-neutral-700 bg-neutral-900">
                <BiImage size={27} />
                <span className='text-xs'>Картинка</span>
            </div>
        </div>
    )
}

export default BlocksIn