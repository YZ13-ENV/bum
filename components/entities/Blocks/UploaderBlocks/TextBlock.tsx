import { TextBlock } from '@/types'
import { Button, Input, Space } from 'antd'
import React, { useEffect } from 'react'
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiBold, BiItalic } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { MdTextDecrease, MdTextIncrease } from 'react-icons/md'
import { setBlocks } from '../../uploader/store'
type Props = {
    block: TextBlock
    index: number
}
const { TextArea } = Input
const TextBlock = ({ block, index }: Props) => {
    const dispatch = useAppDispatch()
    const blocks = useAppSelector(state => state.uploader.shot.blocks)
    const [size, setSize] = React.useState<TextBlock['size']>(block.size)
    const [align, setAlign] = React.useState<TextBlock['align']>(block.align)
    const [isBold, setIsBold] = React.useState<boolean>(block.isBold)
    const [isItalic, setIsItalic] = React.useState<boolean>(block.isItalic)
    const [text, setText] = React.useState<string>(block.text)
    const getBlockAlign = (align: TextBlock['align'], isImportant?: boolean) => {
        if (align === 'left') return isImportant ? '!text-left' : 'text-left'
        if (align === 'center') return isImportant ? '!text-center' : 'text-center'
        if (align === 'right') return isImportant ? '!text-right' : 'text-right'
    }
    const changeSize = (size: TextBlock['size'], action: 'plus' | 'minus') => {
        if (size === 1 && action === 'plus') {
            setSize(2)
        }
        if (size === 2 && action === 'plus') {
            setSize(3)
        }
        if (size === 2 && action === 'minus') {
            setSize(1)
        }
        if (size === 3 && action === 'minus') {
            setSize(2)
        }
    }
    const getSize = (size: TextBlock['size'], isImportant?: boolean) => {
        return size === 1 ? isImportant ? '!text-sm' : 'text-sm' : 
        size === 2 ? isImportant ? '!text-base' : 'text-base' : 
        size === 3 ? isImportant ? '!text-xl' : 'text-xl' : 'text-base'
    }
    const getDecorators = (isBold: boolean, isItalic: boolean, isImportant?: boolean) => {
        return `${isBold ? isImportant ? '!font-bold' : 'font-bold' : ''} ${isItalic ? isImportant ? '!italic' : 'italic' : ''}`
    }
    const getUpdateBlock = () => {
        const buildedBlock: TextBlock = {
            type: 'text',
            align: align,
            isBold: isBold,
            isItalic: isItalic,
            size: size,
            text: text
        }
        const updatedBlocks = blocks.map((_, blockIndex) => {
            if (blockIndex === index) return buildedBlock
            return _   
        })
        dispatch(setBlocks(updatedBlocks))
    }
    useEffect(() => {
        getUpdateBlock()
    },[align, isBold, isItalic, size, text])
    return (
        <div className='flex flex-col items-end justify-center w-full h-fit'>
            <TextArea autoSize={{ minRows: 1 }} value={text} onChange={e => setText(e.target.value)}
            className={`!rounded-none !p-0 ${getBlockAlign(align)} ${getSize(size, true)} ${getDecorators(isBold, isItalic, true)}`} 
            bordered={false} placeholder='Введите текст здесь' />
            <div onClick={e => e.preventDefault()} className="flex items-center gap-2 p-2 border w-fit h-fit rounded-xl border-neutral-800 bg-neutral-900">
                <Space.Compact>
                    <Button onClick={() => changeSize(size, 'minus')}><MdTextDecrease size={15} /></Button>
                    <Button>{size === 1 ? 12 : size === 2 ? 16 : size === 3 ? 18 : 16}</Button>
                    <Button onClick={() => changeSize(size, 'plus')}><MdTextIncrease size={15} /></Button>
                </Space.Compact>
                <Space.Compact>
                    <Button onClick={() => setIsBold(!isBold)} type={isBold ? 'primary' : 'default'} ><BiBold size={15} /></Button>
                    <Button onClick={() => setIsItalic(!isItalic)} type={isItalic ? 'primary' : 'default'} ><BiItalic size={15} /></Button>
                </Space.Compact>
                <Space.Compact>
                    <Button type={ align === 'left' ? 'primary' : 'default' } 
                    onClick={() => setAlign('left')}>
                        <BiAlignLeft size={15} />
                    </Button>
                    <Button type={ align === 'center' ? 'primary' : 'default' } 
                    onClick={() => setAlign('center')}>
                        <BiAlignMiddle size={15} />
                    </Button>
                    <Button type={ align === 'right' ? 'primary' : 'default' } 
                    onClick={() => setAlign('right')}>
                        <BiAlignRight size={15} />
                    </Button>
                </Space.Compact>
            </div>
        </div>
    )
}

export default TextBlock