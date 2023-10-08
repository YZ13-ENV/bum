import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';
type Props = {
    index: number
    children: ReactNode
}
const DraggableWrapper = ({ children, index }: Props) => {
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        } = useDraggable({ id: index });
    const style = {
        transform: transform 
        ? CSS.Transform.toString({ x: transform.x, y: transform.y, scaleX: isDragging ? .85 : 1, scaleY: isDragging ? .85 : 1 }) 
        : CSS.Transform.toString({ x: 0, y: 0, scaleX: 1, scaleY: 1 }),
        transition: isDragging ? 'transform linear 0ms' : 'transform cubic-bezier(0.4, 0, 0.2, 1) 300ms'
    };
    return (
        <div className='z-20 shrink-0' ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    )
}

export default DraggableWrapper