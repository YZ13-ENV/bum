import { TextBlock } from '@/types'
import { Button, Input, Space } from 'antd'
import React, { useEffect } from 'react'
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiBold, BiItalic } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../store/store'
import { MdTextDecrease, MdTextIncrease } from 'react-icons/md'
import { setBlocks } from '../uploader/store'
import { fontSize } from '@/utils/fontSize'
type Props = {
    block: TextBlock
    index: number
}
const { TextArea } = Input
const TextBlock = ({ block, index }: Props) => {
    const dispatch = useAppDispatch()
    const blocks = useAppSelector(state => state.uploader.shot.blocks)
    const getBlockAlign = (align: TextBlock['align'], isImportant?: boolean) => {
        if (align === 'left') return isImportant ? '!text-left' : 'text-left'
        if (align === 'center') return isImportant ? '!text-center' : 'text-center'
        if (align === 'right') return isImportant ? '!text-right' : 'text-right'
    }
    const changeSize = (action: 'plus' | 'minus') => {
        if (block.size >= 1 && action === 'minus') {
            const updatedSize: TextBlock = {
                ...block,
                size: block.size - 1 as TextBlock['size']
            }
            const updatedBlocks = blocks.map((_, blockIndex) => {
            if (blockIndex === index) return updatedSize
                return _   
            })
            dispatch(setBlocks(updatedBlocks))
        }
        if (block.size <= 2 && action === 'plus') {
            const updatedSize: TextBlock = {
                ...block,
                size: block.size + 1 as TextBlock['size']
            }
            const updatedBlocks = blocks.map((_, blockIndex) => {
            if (blockIndex === index) return updatedSize
                return _   
            })
            dispatch(setBlocks(updatedBlocks))
        }
    }
    const updateIsBold = () => {
        const updatedIsBold: TextBlock = {
            ...block,
            isBold: !block.isBold
        }
        const updatedBlocks = blocks.map((_, blockIndex) => {
        if (blockIndex === index) return updatedIsBold
            return _   
        })
        dispatch(setBlocks(updatedBlocks))
    }
    const updateAlign = (align: TextBlock['align']) => {
        const updatedAlign: TextBlock = {
            ...block,
            align: align
        }
        const updatedBlocks = blocks.map((_, blockIndex) => {
        if (blockIndex === index) return updatedAlign
            return _   
        })
        dispatch(setBlocks(updatedBlocks))
    }
    const updateIsItalic = () => {
        const updatedIsItalic: TextBlock = {
            ...block,
            isBold: !block.isItalic
        }
        const updatedBlocks = blocks.map((_, blockIndex) => {
        if (blockIndex === index) return updatedIsItalic
            return _   
        })
        dispatch(setBlocks(updatedBlocks))
    }
    const getSize = (size: number) => {
        return `!${fontSize[size]}`
    }
    const getDecorators = (isBold: boolean, isItalic: boolean) => {
        return `${isBold ? '!font-bold' : '' } ${isItalic ? '!italic' : ''}`
    }
    const updateText = (text: string) => {
        const updatedText: TextBlock = {
            ...block,
            text: text
        }
        const updatedBlocks = blocks.map((_, blockIndex) => {
            if (blockIndex === index) return updatedText
            return _   
        })
        dispatch(setBlocks(updatedBlocks))
    }
    return (
        <div className='flex flex-col items-end justify-center w-full h-fit'>
            <TextArea autoSize={{ minRows: 1 }} value={block.text} onChange={e => updateText(e.target.value)}
            className={`!rounded-none !p-0 ${getSize(block.size)} ${getBlockAlign(block.align)} ${getDecorators(block.isBold, block.isItalic)}`} 
            bordered={false} placeholder='Введите текст здесь' />
            <div onClick={e => e.preventDefault()} className="flex items-center gap-2 p-2 border w-fit h-fit rounded-xl border-neutral-800 bg-neutral-900">
                <Space.Compact>
                    <Button onClick={() => changeSize('minus')}><MdTextDecrease size={15} /></Button>
                    <Button>{block.size}</Button>
                    <Button onClick={() => changeSize('plus')}><MdTextIncrease size={15} /></Button>
                </Space.Compact>
                <Space.Compact>
                    <Button onClick={() => updateIsBold()} type={block.isBold ? 'primary' : 'default'} ><BiBold size={15} /></Button>
                    <Button onClick={() => updateIsItalic()} type={block.isItalic ? 'primary' : 'default'} ><BiItalic size={15} /></Button>
                </Space.Compact>
                <Space.Compact>
                    <Button type={ block.align === 'left' ? 'primary' : 'default' } 
                    onClick={() => updateAlign('left')}>
                        <BiAlignLeft size={15} />
                    </Button>
                    <Button type={ block.align === 'center' ? 'primary' : 'default' } 
                    onClick={() => updateAlign('center')}>
                        <BiAlignMiddle size={15} />
                    </Button>
                    <Button type={ block.align === 'right' ? 'primary' : 'default' } 
                    onClick={() => updateAlign('right')}>
                        <BiAlignRight size={15} />
                    </Button>
                </Space.Compact>
            </div>
        </div>
    )
}

export default TextBlock