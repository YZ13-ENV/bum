'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store';
import { Input } from 'antd';
import { useMemo } from 'react'
import { setTitle } from '@/components/entities/uploader/draft.store';
import dynamic from 'next/dynamic';
import ShortGridBlock from '@/components/entities/Blocks/ViewBlocks/ShortGridBlock';
const UploaderWatcher = dynamic(() => import('@/components/entities/uploader/watcher'));
const TextBlock = dynamic(() => import('@/components/entities/Blocks/TextBlock'));
const MediaUploader = dynamic(() => import('@/components/entities/Blocks/MediaBlock/MediaUploader'));

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
    const draft = useAppSelector(state => state.uploader.draft)
    const rootBlock = useMemo(() => draft.rootBlock, [draft.rootBlock])
    const dispatch = useAppDispatch()
    const isSubscriber = useAppSelector(state => state.user.isSubscriber)
    // console.log(draft.blocks)
    return (
        <>
            <UploaderWatcher />
            <div className="flex flex-col w-full h-full max-w-4xl max-h-full px-4 py-4 mx-auto overflow-y-auto gap-14 md:px-0 md:py-4">
                <div className="w-full max-w-2xl mx-auto">
                    <Input size='large' disabled={draft.rootBlock.link === ''} className='!rounded-none !p-0 !text-4xl !font-extrabold !text-center !text-neutral-200'
                    value={draft.title} onChange={e => dispatch(setTitle(e.target.value))}
                    placeholder={draft.rootBlock.link === '' ? 'Сначала загрузите картинку ниже' : 'Введите название для вашей работы'} bordered={false} />
                </div>
                <MediaUploader isRootBlock uploadOnlyImages={false} block={rootBlock}  />
                <div className="flex flex-col w-full px-6 md:px-12 h-fit gap-14">
                    {
                        draft.blocks.map((block, index) => {
                            if (block.type === 'text') {
                                return <div key={`block#${index}`} className='w-full max-w-2xl mx-auto'><TextBlock block={block} index={index} /></div>
                            }
                            if (block.type === 'image' || block.type === 'video') {
                                return <MediaUploader key={`block#${index}`} uploadOnlyImages={isSubscriber ? false : true} index={index} block={block} />
                            }
                            if (block.type === 'shotGrid') {
                                return <ShortGridBlock key={`block#${index}`} index={index} block={block} />
                            }
                            return null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default UploadBlockView