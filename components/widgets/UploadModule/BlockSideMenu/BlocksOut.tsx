'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
// import { BiLock } from 'react-icons/bi'
import TextBlock from '@/components/entities/Blocks/MenuBlocks/TextBlock'
import SortableWrapper from '@/components/shared/SortableWrapper'
import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
// import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import { setBlocks } from '@/components/entities/uploader/draft.store'
import MenuMediaBlock from '@/components/entities/Blocks/MenuBlocks/MediaBlock';
import ShotsGridBlock from '@/components/entities/Blocks/MenuBlocks/ShotsGridBlock';
const BlocksOut = () => {
    const draft = useAppSelector(state => state.uploader.draft)
    const dispatch = useAppDispatch()
    const onDragEnd = (event: DragEndEvent) => {
        // console.log(event);
        if (event.over && event.over.id !== event.active.id) {
            const blockFrom = draft.blocks[parseInt(event.active.id.toString()) - 1]
            const blockTo = draft.blocks[parseInt(event.over.id.toString()) - 1]
            const updatedBlocks = draft.blocks.map((_, index) => {
                if (index === parseInt(event.active.id.toString()) - 1) {
                    return blockTo
                }
                if (event.over && index === parseInt(event.over.id.toString()) - 1) {
                    return blockFrom
                }
                return _
            })
            dispatch(setBlocks(updatedBlocks))
        }
    }
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 10
        }
    });
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(
      mouseSensor,
      touchSensor,
      keyboardSensor,
    );
    return (
        <div className="flex flex-col w-full h-full gap-2">
            <TextBlock disabled index={-1} block={{ text: draft.title }} />
            {
                draft.thumbnail && draft.thumbnail.link !== '' ?
                <MenuMediaBlock index={-1} block={draft.thumbnail} disabled />
                : draft.rootBlock.link !== '' &&
                <MenuMediaBlock index={-1} block={draft.rootBlock} disabled />
            }
            <div className="flex flex-col w-full h-full gap-2">
            {
                draft.blocks.length <= 1
                ?
                draft.blocks.map((block, index) => {
                    if (block.type === 'text') {
                        return (
                            <TextBlock key={`block#${index}`} index={index} block={block} />
                        )
                    } 
                    if (block.type === 'image' || block.type === 'video') {
                        return (
                            <MenuMediaBlock key={`block#${index}`} index={index} block={block} />
                        ) 
                    }
                    if (block.type === 'shotGrid') {
                        return (
                            <ShotsGridBlock key={`block#${index}`} index={index} block={block} />
                        ) 
                    }
                    return (
                        <div key={`block#${index}`} className="flex flex-col items-center justify-center w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950"/>
                    )
                })
                :
                <DndContext onDragEnd={onDragEnd} sensors={sensors}>
                    <SortableContext strategy={verticalListSortingStrategy} items={draft.blocks.map((_, index) => ({ id: index + 1, ..._ }))}>
                        {
                            draft.blocks.map((block, index) => {
                                if (block.type === 'text') {
                                    return (
                                        <SortableWrapper key={`block#${index}`} index={index + 1}>
                                            <TextBlock index={index} block={block} />
                                        </SortableWrapper>
                                    )
                                } 
                                if (block.type === 'image') {
                                    return (
                                        <SortableWrapper key={`block#${index}`} index={index + 1}>
                                            <MenuMediaBlock index={index} block={block} />
                                        </SortableWrapper>
                                    ) 
                                }
                                if (block.type === 'video') {
                                    return (
                                        <SortableWrapper key={`block#${index}`} index={index + 1}>
                                            <MenuMediaBlock index={index} block={block} />
                                        </SortableWrapper>
                                    ) 
                                }
                                return (
                                    <SortableWrapper key={`block#${index}`} index={index + 1}>
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