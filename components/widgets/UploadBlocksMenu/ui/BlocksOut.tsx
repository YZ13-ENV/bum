import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import { BiLock } from 'react-icons/bi'
import BlockImage from '../../UploadBlockView/ui/BlockImage'
import TextBlock from '@/components/entities/Blocks/MenuBlocks/TextBlock'
import ImageBlock from '@/components/entities/Blocks/MenuBlocks/ImageBlock'
import SortableWrapper from '@/components/entities/Blocks/MenuBlocks/SortableWrapper'
import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { setBlocks } from '@/components/entities/shotUploader/store'
const BlocksOut = () => {
    const uploader = useAppSelector(state => state.uploader)
    const dispatch = useAppDispatch()
    const onDragEnd = (event: DragEndEvent) => {
        console.log(event);
        if (event.over && event.over.id !== event.active.id) {
            const blockFrom = uploader.shot.blocks[parseInt(event.active.id.toString())]
            const blockTo = uploader.shot.blocks[parseInt(event.over.id.toString())]
            const updatedBlocks = uploader.shot.blocks.map((_, index) => {
                if (index === parseInt(event.active.id.toString())) {
                    return blockTo
                }
                if (event.over && index === parseInt(event.over.id.toString())) {
                    return blockFrom
                }
                return _
            })
            dispatch(setBlocks(updatedBlocks))
        }
    }
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: {
                x: 5,
                y: 15
            }
        }
    });
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    
    const sensors = useSensors(
      mouseSensor,
      touchSensor,
      keyboardSensor,
    );
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
            <div className="flex flex-col w-full h-full gap-2">
            {
                uploader.shot.blocks.length <= 1
                ?
                uploader.shot.blocks.map((block, index) => {
                    if (block.type === 'text') {
                        return (
                            <TextBlock key={`block#${index}`} index={index} block={block} />
                        )
                    } 
                    if (block.type === 'image') {
                        return (
                            <ImageBlock key={`block#${index}`} index={index} block={block} />
                        ) 
                    }
                    return (
                        <div key={`block#${index}`} className="flex flex-col items-center justify-center w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950"/>
                    )
                })
                :
                <DndContext onDragEnd={onDragEnd} sensors={sensors}
                autoScroll={{ layoutShiftCompensation: { x: false, y: false }, acceleration: .1, threshold: { x: 0, y: .25 } }}>
                    <SortableContext strategy={verticalListSortingStrategy} items={uploader.shot.blocks.map((_, index) => ({ id: index }))}>
                        {
                            uploader.shot.blocks.map((block, index) => {
                                if (block.type === 'text') {
                                    return (
                                        <SortableWrapper key={`block#${index}`} index={index}>
                                            <TextBlock index={index} block={block} />
                                        </SortableWrapper>
                                    )
                                } 
                                if (block.type === 'image') {
                                    return (
                                        <SortableWrapper key={`block#${index}`} index={index}>
                                            <ImageBlock key={`block#${index}`} index={index} block={block} />
                                        </SortableWrapper>
                                    ) 
                                }
                                return (
                                    <SortableWrapper key={`block#${index}`} index={index}>
                                        <div className="flex flex-col items-center justify-center w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950"/>
                                    </SortableWrapper>
                                )
                            })
                        }
                    </SortableContext>
                </DndContext>
            }
            </div>
        </div>
    )
}

export default BlocksOut