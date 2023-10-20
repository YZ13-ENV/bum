'use client'
import React from 'react'
import { BiText, BiImage, BiVideo } from 'react-icons/bi'
import { LuGalleryThumbnails } from 'react-icons/lu'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { ImageBlock, ShotGridBlock, TextBlock } from '@/types'
import { setBlocks } from '../draft.store'

const BlocksGrid = () => {
    const isSubscriber = useAppSelector(state => state.user.isSubscriber)
    const draft = useAppSelector(state => state.uploader.draft)
    const dispatch = useAppDispatch()
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
    const onlyMedia = draft.blocks.filter(block => block.type === 'image' || block.type === 'video')
    const onlyGrid = draft.blocks.filter(block => block.type === 'shotGrid')
    const mediaLimit = isSubscriber ? onlyMedia.length === 10 : onlyMedia.length === 5
    const gridLimit = isSubscriber ? onlyGrid.length === 5 : onlyMedia.length === 0
    if (draft.rootBlock.link === '') return null
    return (
        <div className='grid w-full h-full grid-cols-4 grid-rows-1 gap-2'>
            <div onClick={() => addBlock('text')}
            className="flex items-center justify-center h-full border rounded-lg aspect-square border-neutral-700 hover:bg-neutral-900">
                <BiText size={22} />
            </div>
            <div onClick={() => !mediaLimit && addBlock('image')}
            className="flex flex-col items-center justify-center h-full gap-2 border rounded-lg aspect-square border-neutral-700 hover:bg-neutral-900">
                <div className="flex items-center justify-center gap-1 w-fit h-fit">
                    <BiImage size={22} />
                    {
                        isSubscriber &&
                        <>
                            <span className='text-sm text-neutral-300'>/</span>
                            <BiVideo size={22} />
                        </>
                    }
                </div>
                <span className='text-xs text-center text-neutral-300'>
                    {onlyMedia.length}/{isSubscriber ? 10 : 5}
                </span>
            </div>
            {
                isSubscriber &&
                <div onClick={() => !gridLimit && addBlock('shotGrid')}
                className="flex flex-col items-center justify-center h-full gap-2 border rounded-lg aspect-square border-neutral-700 hover:bg-neutral-900">
                    <LuGalleryThumbnails size={22} />
                    <span className='text-xs text-center text-neutral-300'>
                        {onlyGrid.length}/{isSubscriber ? 5 : 0}
                    </span>
                </div>
            }
        </div>
    )
}

export default BlocksGrid