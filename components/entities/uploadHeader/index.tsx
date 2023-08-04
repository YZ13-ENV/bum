'use client'
import { Button } from 'antd'
import React from 'react'
import { 
    TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand,
    TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand
 } from 'react-icons/tb'
import { useAppDispatch, useAppSelector } from '../store/store'
import { setBlockSidebar, setFinalTouchModal, setPrevWorkSidebar } from '../shotUploader/store'
import { useMediaQuery } from 'react-responsive'
const UploadHeader = () => {
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const shotUploader = useAppSelector(state => state.uploader)
    const dispatch = useAppDispatch()
    return (
        <div className="flex items-center justify-between w-full gap-2 px-4 pb-2 border-b h-fit border-neutral-800">
            <div className="flex items-center gap-2 w-fit h-fit">
                <Button onClick={() => dispatch(setPrevWorkSidebar(!shotUploader.prevWorkSidebar))}>
                    {
                        shotUploader.prevWorkSidebar
                        ? <TbLayoutSidebarLeftCollapse size={17} />
                        : <TbLayoutSidebarLeftExpand size={17} />
                    }
                </Button>
                <Button href='/'>Вернуться</Button>
            </div>
            <div className="flex items-center gap-2 w-fit h-fit">
                {/* <Button>{isTabletOrMobile ? <BiSave size={17} /> : 'Сохранить в черновик'}</Button> */}
                <Button disabled={shotUploader.shot.rootBlock.link === '' || shotUploader.shot.title === ''} 
                onClick={() => dispatch(setFinalTouchModal(true))} type='primary'>Продолжить</Button>
                <Button disabled={shotUploader.shot.rootBlock.link === ''} 
                onClick={() => dispatch(setBlockSidebar(!shotUploader.blocksSidebar))}>
                    {
                        shotUploader.blocksSidebar
                        ? <TbLayoutSidebarRightCollapse size={17} />
                        : <TbLayoutSidebarRightExpand size={17} />
                    }
                </Button>
            </div>
        </div>
    )
}

export default UploadHeader