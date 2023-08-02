import { Button } from 'antd'
import React from 'react'
import PrevWorks from '../widgets/PrevWork'
import UploadBlockView from '../widgets/UploadBlockView'
import UploadBlocksMenu from '../widgets/UploadBlocksMenu'
import UploadHeader from '../entities/uploadHeader'

const UploadShot = () => {
    return (
        // 3 секции 
        /* 
            [x] - 1 - Для добавления предыдущих работ в рекомендации к текущей публикации
            [x] - 2 - Отображение добавленных блоков
            [x] - 3 - Меню с блоками для добавление 
        */
        <section className='flex flex-col w-full h-full'>
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