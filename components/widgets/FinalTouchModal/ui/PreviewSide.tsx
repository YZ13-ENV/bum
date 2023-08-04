import { useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import BlockImage from '../../UploadBlockView/ui/BlockImage'
import { BiSolidHeart, BiSolidShow } from 'react-icons/bi'

const PreviewSide = () => {
    const uploaderDraft = useAppSelector(state => state.uploader.shot)
    return (
        <div className="flex flex-col w-2/6 h-full gap-2">
            <span className='text-sm font-semibold text-neutral-200'>Предпросмотр обложки</span>
            <div className="relative w-full h-48 gap-2 rounded-xl bg-neutral-800">
                <BlockImage imageLink={uploaderDraft.rootBlock.link} />
                <div className="absolute bottom-0 left-0 flex items-center justify-end w-full gap-2 h-fit">
                    <div className="flex items-center h-full gap-2 p-2 w-fit rounded-tl-xl rounded-br-xl bg-opacity-40 bg-neutral-950">
                        <div className="flex items-center gap-1 w-fit h-fit text-neutral-200">
                            <BiSolidShow size={17} className='text-inherit' />
                            <span className='text-sm text-inherit'>0</span>
                        </div>
                        <div className="flex items-center gap-1 w-fit h-fit text-neutral-200">
                            <BiSolidHeart size={17} className='text-inherit' />
                            <span className='text-sm text-inherit'>0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewSide