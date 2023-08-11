import React from 'react'
const PrevWorks = dynamic(() => import('../widgets/PrevWork')) 
import UploadBlocksMenu from '../widgets/Uploader/ui/BlockSideMenu'
import FinalTouchModal from '../widgets/FinalTouchModal'
import UploadHeader from '../entities/uploader/ui/uploadHeader'
import UploadBlockView from '@/components/widgets/Uploader'
import dynamic from 'next/dynamic'

const UploadShot = () => {
    return (
        // 3 секции 
        /* 
            [x] - 1 - Для добавления предыдущих работ в рекомендации к текущей публикации
            [x] - 2 - Отображение добавленных блоков
            [x] - 3 - Меню с блоками для добавление 
        */
        <section className='flex flex-col w-full h-full shrink-0'>
            <FinalTouchModal />
            <UploadHeader />
            <div className="flex w-full h-full">
                <PrevWorks />
                <UploadBlockView />
                <UploadBlocksMenu />
            </div>
        </section>
    )
}

export default UploadShot