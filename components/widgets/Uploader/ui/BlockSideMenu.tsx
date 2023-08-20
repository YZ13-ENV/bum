'use client'
import { Button, Segmented } from 'antd'
import { SegmentedLabeledOption } from 'antd/es/segmented'
import React from 'react'
import { BiListUl, BiGridAlt } from 'react-icons/bi'
import BlocksIn from './BlocksIn'
import BlocksOut from './BlocksOut'
import Wrapper from './Wrapper'
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb'
import { useAppDispatch } from '@/components/entities/store/store'
import { setBlockSidebar } from '@/components/entities/uploader/modal.store'
const UploadBlocksMenu = () => {
    const dispatch = useAppDispatch()
    const [blockSegment, setBlockSegment] = React.useState<string>('')
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
        <Wrapper>
            <div className="flex flex-col w-full h-full gap-2">
                <div className="flex items-center justify-start w-full gap-2 h-fit">
                    <Button onClick={() => dispatch(setBlockSidebar(false))} className='!px-2'><TbLayoutSidebarRightCollapse size={17} /></Button>
                    <span className='font-semibold text-neutral-200'>Блоки</span>
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
        </Wrapper>
    )
}

export default UploadBlocksMenu