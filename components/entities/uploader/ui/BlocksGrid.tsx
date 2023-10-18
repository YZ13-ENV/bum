'use client'
import React from 'react'
import { BiText, BiImage } from 'react-icons/bi'
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
    if (draft.rootBlock.link === '') return null
    return (
        <div className='flex items-center h-full gap-2 w-fit'>
            <div onClick={() => addBlock('text')}
            className="flex items-center justify-center h-full border rounded-lg aspect-square border-neutral-700 hover:bg-neutral-900">
                <BiText size={22} />
            </div>
            <div onClick={() => addBlock('image')}
            className="flex items-center justify-center h-full border rounded-lg aspect-square border-neutral-700 hover:bg-neutral-900">
                <BiImage size={22} />
            </div>
            <div onClick={() => addBlock('shotGrid')}
            className="flex items-center justify-center h-full border rounded-lg aspect-square border-neutral-700 hover:bg-neutral-900">
                <LuGalleryThumbnails size={22} />
            </div>
        </div>
    )
}

export default BlocksGrid