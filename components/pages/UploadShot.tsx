import dynamic from 'next/dynamic'
import UploadBlockView from '../widgets/UploadModule/UploadView'
const UploadHeader = dynamic(() => import('../entities/uploader/ui/uploadHeader')) 

const PrevWorks = dynamic(() => import('../widgets/UploadModule/PrevWork')) 
const UploadBlocksMenu = dynamic(() => import('../widgets/UploadModule/BlockSideMenu/index')) 
const FinalTouchModal = dynamic(() => import('../widgets/FinalTouchModal')) 

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
            <div className="flex w-full h-full overflow-hidden uploader_view_wrapper">
                <PrevWorks />
                <UploadBlockView />
                <UploadBlocksMenu />
            </div>
        </section>
    )
}

export default UploadShot