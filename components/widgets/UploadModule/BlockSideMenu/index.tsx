'use client'
import { Button, Segmented } from 'antd'
import { SegmentedLabeledOption } from 'antd/es/segmented'
import { BiListUl, BiGridAlt } from 'react-icons/bi'
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlockSidebar } from '@/components/entities/uploader/modal.store'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { auth } from '@/utils/app'
import Avatar from '@/components/shared/Avatar'
import { useAuthState } from 'react-firebase-hooks/auth'
import Wrapper from './Wrapper'
// import UserStatus from '@/components/entities/user'
const BlocksIn = dynamic(() => import('./BlocksIn')) 
const BlocksOut = dynamic(() => import('./BlocksOut')) 

const UploadBlocksMenu = () => {
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const dispatch = useAppDispatch()
    const [blockSegment, setBlockSegment] = useState<string>('')
    const options: SegmentedLabeledOption[] = [
        {
            icon: <BiGridAlt size={15} className='inline mb-0.5' />,
            label: 'Блоки',
            value: 'in'
        },
        {
            icon: <BiListUl size={15} className='inline mb-0.5' />,
            label: 'Добавленные',
            value: 'out'
        }
    ]
    return (
        <Wrapper>
            <div className="flex flex-col w-full h-full gap-2">
                <div className="flex items-center justify-between w-full gap-2 h-fit">
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Button onClick={() => dispatch(setBlockSidebar(false))} className='!px-2'><TbLayoutSidebarRightCollapse size={17} /></Button>
                        <span className='font-semibold text-neutral-200'>Блоки</span>
                    </div>
                    <Avatar size={36} src={user?.photoURL || null} isSub={isSub} noLabel />
                    {/* <UserStatus showDropdown={false} /> */}
                </div>
                <div className="flex w-full h-fit">
                    <Segmented className='!w-full' size='large' options={options} block value={blockSegment} onChange={e => setBlockSegment(e.toString())} />
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