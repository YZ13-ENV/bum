'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import { BiLock } from 'react-icons/bi'
import TextBlock from '@/components/entities/Blocks/MenuBlocks/TextBlock'
import SortableWrapper from '@/components/shared/ui/SortableWrapper'
import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { setBlocks } from '@/components/entities/uploader/store'
import MenuMediaBlock from '@/components/entities/Blocks/MediaBlock/MenuMediaBlock'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
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
                <span className='font-semibold'>{uploader.shot.title || 'Заголовок работы'}</span>
                <BiLock size={17} className='text-neutral-400' />
            </div>

            {
                uploader.shot.thumbnail && uploader.shot.thumbnail.link !== '' ?
                <div className="relative flex aspect-video items-center justify-center w-full min-h-[16rem] h-fit">
                    <div className="absolute z-10 p-2 rounded-xl bg-neutral-900"><BiLock size={27} /></div>
                    <MediaBlock {...{link: uploader.shot.thumbnail.link, type: 'image'}} object='cover' autoPlay />
                </div>
                : uploader.shot.rootBlock.link !== '' &&
                <div className="relative flex aspect-video items-center justify-center w-full h-fit min-h-[16rem]">
                    <div className="absolute z-10 p-2 rounded-xl bg-neutral-900"><BiLock size={27} /></div>
                    <MediaBlock {...uploader.shot.rootBlock} autoPlay object='cover' />
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
                            <MenuMediaBlock key={`block#${index}`} index={index} block={block} />
                        ) 
                    }
                    return (
                        <div key={`block#${index}`} className="flex flex-col items-center justify-center w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950"/>
                    )
                })
                :
                <DndContext onDragEnd={onDragEnd} sensors={sensors}
                autoScroll={{ acceleration: .1 }}>
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
                                            <MenuMediaBlock key={`block#${index}`} index={index} block={block} />
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