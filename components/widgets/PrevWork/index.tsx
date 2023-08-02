import Tip from '@/components/shared/Tip'
import React from 'react'
import PrevShotCard from './ui/PrevShotCard'
import { ShotData } from '@/types'

type Props = {
    prevShots: ShotData[]
}
const PrevWorks = ({ prevShots }: Props) => {
    return (
        <div className="flex flex-col w-full h-full max-w-sm gap-2 p-4">
            <Tip text='Картинка, которую вы загрузите в первый блок, будет использоваться как обложка для работы, если вы не загрузите обложку' />
            <Tip text='Вы можете перемещать между собой блоки, кроме первого блока с изображением' />
            <Tip text='Если вы хотите продолжить публикацию позже, вы можете сохранить в черновики, и продолжить позднее' />
            <hr className='border-neutral-700' />
            <div className="flex flex-col w-full h-full gap-2">
                <span className='font-semibold text-neutral-200'>Ваши работы</span>
                {
                    prevShots.length === 0
                    ? <div className='flex flex-col items-center justify-center w-full h-full'>
                        <span className='text-xs text-center text-neutral-400'>Нет последних работ</span>
                    </div>
                    :
                    <div className="flex flex-col w-full h-full gap-4 overflow-y-auto">
                        {
                            prevShots.map((shot, index) => 
                            <PrevShotCard key={index} />
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default PrevWorks