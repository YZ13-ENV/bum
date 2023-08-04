'use client'
import Tip from '@/components/shared/Tip'
import React, { useState } from 'react'
import PrevShotCard from './ui/PrevShotCard'
import { DocDraftShotData, DocShotData } from '@/types'
import { useAppSelector } from '@/components/entities/store/store'

type Props = {
    prevShots: DocDraftShotData[]
}
const PrevWorks = ({ prevShots }: Props) => {
    const prevWorksExpanded = useAppSelector(state => state.uploader.prevWorkSidebar)
    return (
        <div 
        className={`absolute ${prevWorksExpanded ? 'left-0' : '-left-[100%]'}  flex-col border-r border-neutral-800
        w-full h-full max-w-sm gap-2 p-4 flex bg-black z-10 upload_sidebar overflow-y-auto`}>
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
                    <div className="flex flex-col w-full h-full gap-4 ">
                        {
                            prevShots.map((shot, index) => 
                                <PrevShotCard key={index} block={shot} />
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default PrevWorks