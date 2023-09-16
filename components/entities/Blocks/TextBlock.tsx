import { TextBlock } from '@/types'
import { Button, Space } from 'antd'
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiBold, BiItalic, BiSolidMagicWand } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../store/store'
import { MdTextDecrease, MdTextIncrease } from 'react-icons/md'
import { fontSize } from '@/utils/fontSize'
import { setBlocks } from '../uploader/draft.store'
import TextArea from '@/components/shared/TextArea'
import MDTextBlock from '@/components/entities/Blocks/ViewBlocks/TextBlock'
import { BsMarkdown, BsMarkdownFill } from 'react-icons/bs'
import { setMDSyntax } from '../uploader/modal.store'
import { useLayoutEffect, useState } from 'react'
type Props = {
    block: TextBlock
    index: number
}

const TextBlock = ({ block, index }: Props) => {
    const [preview, setPreview] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const enableSyntax = useAppSelector(state => state.uploader.modals.enableMDSyntax)
    const draft = useAppSelector(state => state.uploader.draft)
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
            const updatedBlocks = draft.blocks.map((_, blockIndex) => {
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
            const updatedBlocks = draft.blocks.map((_, blockIndex) => {
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
        const updatedBlocks = draft.blocks.map((_, blockIndex) => {
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
        const updatedBlocks = draft.blocks.map((_, blockIndex) => {
        if (blockIndex === index) return updatedAlign
            return _   
        })
        dispatch(setBlocks(updatedBlocks))
    }
    const updateIsItalic = () => {
        const updatedIsItalic: TextBlock = {
            ...block,
            isItalic: !block.isItalic
        }
        const updatedBlocks = draft.blocks.map((_, blockIndex) => {
        if (blockIndex === index) return updatedIsItalic
            return _   
        })
        dispatch(setBlocks(updatedBlocks))
    }
    const getSize = (size: number) => {
        return fontSize[size]
    }
    const getDecorators = (isBold: boolean, isItalic: boolean) => {
        return `${isBold ? '!font-bold' : '' } ${isItalic ? '!italic' : ''}`
    }
    const updateText = (text: string) => {
        const updatedText: TextBlock = {
            ...block,
            text: text
        }
        const updatedBlocks = draft.blocks.map((_, blockIndex) => {
            if (blockIndex === index) return updatedText
            return _   
        })
        dispatch(setBlocks(updatedBlocks))
    }
    useLayoutEffect(() => {
        if (!enableSyntax && preview) setPreview(false)
    },[enableSyntax])
    if (preview) return(
        <div className='flex flex-col items-end justify-center w-full gap-2 h-fit'>
            <MDTextBlock enableMdSyntax={enableSyntax} block={block} />
            <div onClick={e => e.preventDefault()} className="flex items-center gap-2 w-fit h-fit">
                <Button onClick={() => setPreview(!preview)} type={preview ? 'primary' : 'default'} disabled={!enableSyntax}><BiSolidMagicWand /></Button>
                <Button type={enableSyntax ? 'primary' : 'default'} 
                onClick={() => dispatch(setMDSyntax(!enableSyntax))}>{ enableSyntax ? <BsMarkdownFill size={15}/> : <BsMarkdown size={15}/> }</Button>
            </div>
        </div>
    )
    return (
        <div className='flex flex-col items-end justify-center w-full gap-2 h-fit'>
            <TextArea text={block.text} setText={text => updateText(text)} placeholder='Введите текст здесь' 
            className={`${getDecorators(block.isBold, block.isItalic)} ${getBlockAlign(block.align)} ${getSize(block.size)}`}/>
            <div onClick={e => e.preventDefault()} className="flex items-center gap-2 w-fit h-fit">
                <Button onClick={() => setPreview(!preview)} type={preview ? 'primary' : 'default'} disabled={!enableSyntax}><BiSolidMagicWand /></Button>
                <Button type={enableSyntax ? 'primary' : 'default'} 
                onClick={() => dispatch(setMDSyntax(!enableSyntax))}>{ enableSyntax ? <BsMarkdownFill size={15}/> : <BsMarkdown size={15}/> }</Button>
                {
                    !enableSyntax &&
                    <>
                    <Space.Compact>
                        <Button onClick={() => changeSize('minus')}><MdTextDecrease size={15} /></Button>
                        <Button>{block.size}</Button>
                        <Button onClick={() => changeSize('plus')}><MdTextIncrease size={15} /></Button>
                    </Space.Compact>
                    <Space.Compact>
                        <Button onClick={() => updateIsBold()} type={block.isBold ? 'primary' : 'default'} ><BiBold size={15} /></Button>
                        <Button onClick={() => updateIsItalic()} type={block.isItalic ? 'primary' : 'default'} ><BiItalic size={15} /></Button>
                    </Space.Compact>
                    </>
                }
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