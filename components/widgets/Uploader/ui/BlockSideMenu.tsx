'use client'
import { useAppSelector } from '@/components/entities/store/store'
import { Segmented } from 'antd'
import { SegmentedLabeledOption } from 'antd/es/segmented'
import React from 'react'
import { BiListUl, BiGridAlt } from 'react-icons/bi'
import BlocksIn from './BlocksIn'
import BlocksOut from './BlocksOut'

const UploadBlocksMenu = () => {
    const [blockSegment, setBlockSegment] = React.useState<string>('')
    const blockExpanded = useAppSelector(state => state.uploader.blocksSidebar)
    const options: SegmentedLabeledOption[] = [
        {
            icon: <BiGridAlt size={15} className='inline' />,
            label: 'Блоки',
            value: 'in'
        },
        {
            icon: <BiListUl size={15} className='inline' />,
            label: 'Добавленные',
            value: 'out'
        }
    ]
    return (
        <div className={`flex flex-col w-full h-full absolute border-l border-neutral-800 bg-black upload_sidebar
        ${blockExpanded ? 'right-0 z-20' : '-right-[100%]'} max-w-sm gap-2 p-4 overflow-y-auto`}>
            <div className="flex flex-col w-full h-full gap-2">
                <div className="flex items-center justify-start w-full gap-2 h-fit">
                    <span className='font-semibold text-neutral-200'>Блоки</span>
                    {/* <Button className='!px-2'><BiPlus size={17} /></Button> */}
                </div>
                <div className="flex w-full h-fit">
                    <Segmented className='!w-full' options={options} block value={blockSegment} onChange={e => setBlockSegment(e.toString())} />
                </div>
                {
                    blockSegment === 'in'
                    ? <BlocksIn />
                    : <BlocksOut />
                }
            </div>
        </div>
    )
}

export default UploadBlocksMenu