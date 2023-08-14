'use client'
import { setTitle } from '@/components/entities/uploader/store';
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store';
import { Input } from 'antd';
import React from 'react'
import UploaderWatcher from '@/components/entities/uploader/watcher';
import TextBlock from '@/components/entities/Blocks/TextBlock';
import MediaUploader from '@/components/entities/Blocks/MediaBlock/MediaUploader';

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
    const uploader = useAppSelector(state => state.uploader)
    const dispatch = useAppDispatch()
    // console.log(uploader.shot.blocks)
    return (
        <>
            <UploaderWatcher />
            <div className="flex flex-col w-full h-full max-w-4xl max-h-full gap-4 px-4 py-4 mx-auto overflow-y-auto uploader_view_wrapper md:px-0 md:py-4">
                <div className="w-full max-w-2xl mx-auto">
                    <Input size='large' disabled={uploader.shot.rootBlock.link === ''} className='!rounded-none !p-0 !text-2xl !font-bold'
                    value={uploader.shot.title} onChange={e => dispatch(setTitle(e.target.value))}
                    placeholder={uploader.shot.rootBlock.link === '' ? 'Сначала загрузите картинку ниже' : 'Введите название для вашей работы'} bordered={false} />
                </div>
                <MediaUploader isRootBlock uploadOnlyImages={false} block={uploader.shot.rootBlock}  />
                {
                    uploader.shot.blocks.map((block, index) => {
                        if (block.type === 'text') {
                            return <div key={`block#${index}`} className='w-full max-w-2xl mx-auto'><TextBlock block={block} index={index} /></div>
                        }
                        if (block.type === 'image') {
                            return <MediaUploader key={`block#${index}`} uploadOnlyImages={true} index={index} block={block} />
                        }
                        return null
                    })
                }
            </div>
        </>
    )
}

export default UploadBlockView