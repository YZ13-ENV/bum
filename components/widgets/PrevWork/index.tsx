import React from 'react'
import PrevShotCard from './ui/PrevShotCard'
import { DocDraftShotData } from '@/types'
import { cookies } from 'next/headers'
import { getHost } from '@/helpers/getHost'
import Wrapper from './Wrapper'
import Header from './ui/Header'

const getPrevShots = async() => {
    const cookie = cookies()
    const uid = cookie.get("uid")
    if (uid) {
        try {
            const res = await fetch(`${getHost()}/shots/onlyDrafts?userId=${uid.value}&asDoc=true`, {
                next: { revalidate: 3600 }
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
            <div className="flex flex-col w-full h-full gap-2">
                <Header />
                {
                    works 
                    ? works.length === 0
                    ? <div className='flex flex-col items-center justify-center w-full h-full'>
                        <span className='text-xs text-center text-neutral-400'>Нет последних работ</span>
                    </div>
                    :
                    <div className="grid w-full h-full gap-4 mini_grid">
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