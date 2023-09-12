'use client'
import { Button } from 'antd'
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb'
import { useAppDispatch } from '@/components/entities/store/store'
import { setPrevWorkSidebar } from '@/components/entities/uploader/modal.store'

const Header = () => {
    const dispatch = useAppDispatch()
    return (
        <div className="flex items-center justify-start w-full gap-2 h-fit">
            <Button onClick={() => dispatch(setPrevWorkSidebar(false))} className='!px-2'><TbLayoutSidebarLeftCollapse size={17} /></Button>
            <span className='font-semibold text-neutral-200'>Ваши работы</span>
        </div>
    )
}

export default Header