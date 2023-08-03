import { useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import { BiLock } from 'react-icons/bi'
import BlockImage from '../../UploadBlockView/ui/BlockImage'
import TextBlock from '@/components/entities/Blocks/MenuBlocks/TextBlock'
import ImageBlock from '@/components/entities/Blocks/MenuBlocks/ImageBlock'

const BlocksOut = () => {
    const uploader = useAppSelector(state => state.uploader)
    return (
        <div className="flex flex-col w-full h-full gap-2">
            <div className="flex items-center justify-between w-full p-2 border h-fit rounded-xl border-neutral-800">
                <span className='font-semibold'>{uploader.shot.title}</span>
                <BiLock size={17} className='text-neutral-400' />
            </div>
            {
                uploader.shot.rootBlock.link === ''
                ?
                <div className="flex flex-col items-center justify-center w-full h-56 border shrink-0 rounded-xl border-neutral-800 bg-neutral-950">
                    <BiLock size={24} className='text-neutral-400' />
                </div>
                : <div className="relative flex items-center justify-center w-full h-56 shrink-0">
                    <div className="absolute z-10 p-3 border rounded-lg bg-neutral-900 border-neutral-800">
                        <BiLock size={24} className=' text-neutral-400' />
                    </div>
                    <BlockImage imageLink={uploader.shot.rootBlock.link} />
                </div>
            }
            {
                uploader.shot.blocks.map((block, index) => {
                    if (block.type === 'text') {
                        return <TextBlock key={`block#${index}`} block={block} />
                    } 
                    if (block.type === 'image') {
                        return <ImageBlock key={`block#${index}`} block={block} />
                    }
                    return (
                        <div key={`block#${index}`} 
                        className="flex flex-col items-center justify-center w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950"/>
                    )
                })
            }
        </div>
    )
}

export default BlocksOut