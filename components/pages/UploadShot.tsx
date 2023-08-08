import React from 'react'
import PrevWorks from '../widgets/PrevWork'
import UploadBlocksMenu from '../widgets/Uploader/ui/BlockSideMenu'
import { DocDraftShotData } from '@/types'
import FinalTouchModal from '../widgets/FinalTouchModal'
import UploadHeader from '../entities/uploader/ui/uploadHeader'
import UploadBlockView from '@/components/widgets/Uploader'

type Props = {
    prevShots: DocDraftShotData[]
}
const UploadShot = ({ prevShots }: Props) => {
    return (
        // 3 секции 
        /* 
            [x] - 1 - Для добавления предыдущих работ в рекомендации к текущей публикации
            [x] - 2 - Отображение добавленных блоков
            [x] - 3 - Меню с блоками для добавление 
        */
        <section className='flex flex-col w-full h-full overflow-y-hidden shrink-0'>
            <FinalTouchModal />
            <UploadHeader />
            <div className="flex w-full h-full">
                <PrevWorks prevShots={prevShots} />
                <UploadBlockView />
                <UploadBlocksMenu />
            </div>
        </section>
    )
}

export default UploadShot