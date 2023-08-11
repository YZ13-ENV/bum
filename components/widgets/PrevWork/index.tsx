import React from 'react'
import PrevShotCard from './ui/PrevShotCard'
import { DocDraftShotData } from '@/types'
import Tip from '@/components/shared/ui/Tip'
import { cookies } from 'next/headers'
import { getHost } from '@/helpers/getHost'
import Wrapper from './Wrapper'

const getPrevShots = async() => {
    const cookie = cookies()
    const uid = cookie.get("uid")
    if (uid) {
        try {
            const res = await fetch(`${getHost()}/shots/onlyDrafts?userId=${uid.value}&asDoc=true`, {
                cache: 'no-cache'
            })
            const shots: DocDraftShotData[] = await res.json()
            return shots
        } catch(e) {
            console.log(e);
            return []
        }
    } else return null
}
const PrevWorks = async() => {
    const works = await getPrevShots()
    return (
        <Wrapper>
            <Tip text='Картинка, которую вы загрузите в первый блок, будет использоваться как обложка для работы, если вы не загрузите обложку' />
            <Tip text='Вы можете перемещать между собой блоки, кроме первого блока с изображением' />
            <Tip text='Если вы хотите продолжить публикацию позже, вы можете сохранить в черновики, и продолжить позднее' />
            <hr className='border-neutral-700' />
            <div className="flex flex-col w-full h-full gap-2">
                <span className='font-semibold text-neutral-200'>Ваши работы</span>
                {
                    works 
                    ? works.length === 0
                    ? <div className='flex flex-col items-center justify-center w-full h-full'>
                        <span className='text-xs text-center text-neutral-400'>Нет последних работ</span>
                    </div>
                    :
                    <div className="flex flex-col w-full h-full gap-4 ">
                        {
                            works.map((shot, index) => 
                                <PrevShotCard key={index} block={shot} />
                            )
                        }
                    </div>
                    : null
                }
            </div>
        </Wrapper>
    )
}

export default PrevWorks