'use client'
import { setTitle } from '@/components/entities/shotUploader/store';
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store';
import { Input } from 'antd';
import React from 'react'
import RootBlock from './ui/RootBlock';
import UploaderWatcher from '@/components/entities/shotUploader/watcher';
import TextBlock from '@/components/entities/Blocks/UploaderBlocks/TextBlock';
import ImageBlock from '@/components/entities/Blocks/UploaderBlocks/ImageBlock';

/*
    В момент когда мы закидываем картинку в root block
    в bucket закидывается картинка, а в бд создается 
    документ с теплейтом как драфт (т.е. он не будет отображен для всех) 
    и уже загруженной в root block картинкой.
    ---
    А когда пользователь удаляет свой драфт, то загруженная картинка 
    как и документ стирается с бд
*/

const UploadBlockView = () => {
    const title = useAppSelector(state => state.uploader.shot.title)
    const blocks = useAppSelector(state => state.uploader.shot.blocks)
    const rootBlock = useAppSelector(state => state.uploader.shot.rootBlock)
    const dispatch = useAppDispatch()
    return (
        <>
        <UploaderWatcher />
        <div className="flex flex-col w-full h-full max-w-4xl max-h-full gap-4 px-4 py-4 mx-auto overflow-y-auto uploader_view_wrapper md:px-0 md:py-4">
            <Input size='large' disabled={rootBlock.link === ''} className='!rounded-none !p-0 !text-2xl !font-semibold'
            value={title} onChange={e => dispatch(setTitle(e.target.value))}
            placeholder={rootBlock.link === '' ? 'Сначала загрузите картинку ниже' : 'Введите название для вашей работы'} bordered={false} />
            <RootBlock />
            {
                blocks.map((block, index) => {
                    if (block.type === 'text') {
                        return <TextBlock block={block} index={index} key={`block#${index}`} />
                    }
                    if (block.type === 'image') {
                        return <ImageBlock block={block} index={index} key={`block#${index}`} />
                    }
                    return null
                })
            }
        </div>
        </>
    )
}

export default UploadBlockView