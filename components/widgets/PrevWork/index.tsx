import Tip from '@/components/shared/Tip'
import React from 'react'
import PrevShotCard from './ui/PrevShotCard'

const PrevWorks = () => {
    return (
        <div className="flex flex-col w-full h-full gap-2 p-4">
            <Tip text='Картинка, которую вы загрузите в первый блок, будет использоваться как обложка для работы, если вы не загрузите обложку' />
            <Tip text='Вы можете перемещать между собой блоки, кроме первого блока с изображением' />
            <Tip text='Если вы хотите продолжить публикацию позже, вы можете сохранить в черновики, и продолжить позднее' />
            <hr className='border-neutral-700' />
            <div className="flex flex-col w-full h-full gap-2">
                <span className='font-semibold text-neutral-200'>Ваши работы</span>
                <div className="flex flex-col w-full h-full gap-4">
                    <PrevShotCard />
                    <PrevShotCard />
                    <PrevShotCard />
                </div>
            </div>
        </div>
    )
}

export default PrevWorks