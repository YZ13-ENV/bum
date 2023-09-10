'use client'
import { Button } from 'antd'
import { 
    TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand,
    TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand
 } from 'react-icons/tb'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector, useAppDispatch } from '../../store/store'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { setBlockSidebar, setFinalTouchModal, setPrevWorkSidebar } from '../modal.store'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { redirect } from 'next/navigation'
const UploadHeader = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const modals = useAppSelector(state => state.uploader.modals)
    const draft = useAppSelector(state => state.uploader.draft)
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()
    if (!user) return redirect('/')
    return (
        <div className="flex items-center justify-between w-full gap-2 px-4 py-2 border-b h-fit border-neutral-800">
            <div className="flex flex-row-reverse items-center gap-2 md:flex-row w-fit h-fit">
                <Button onClick={() => dispatch(setPrevWorkSidebar(!modals.prevWorkSidebar))}>
                    {
                        modals.prevWorkSidebar
                        ? <TbLayoutSidebarLeftCollapse size={17} />
                        : <TbLayoutSidebarLeftExpand size={17} />
                    }
                </Button>
                <Button href='/'>{isTabletOrMobile ? <BiLeftArrowAlt className='inline mb-0.5' size={17} /> :'Вернуться'}</Button>
            </div>
            <div className="flex flex-row-reverse items-center gap-2 md:flex-row w-fit h-fit">
                {/* <Button>{isTabletOrMobile ? <BiSave size={17} /> : 'Сохранить в черновик'}</Button> */}
                <Button disabled={draft.rootBlock.link === '' || draft.title === ''} 
                onClick={() => dispatch(setFinalTouchModal(true))} type='primary'>{isTabletOrMobile ? <BiRightArrowAlt size={17} /> :'Продолжить'}</Button>
                <Button disabled={draft.rootBlock.link === ''} 
                onClick={() => dispatch(setBlockSidebar(!modals.blocksSidebar))}>
                    {
                        modals.blocksSidebar
                        ? <TbLayoutSidebarRightCollapse size={17} />
                        : <TbLayoutSidebarRightExpand size={17} />
                    }
                </Button>
            </div>
        </div>
    )
}

export default UploadHeader