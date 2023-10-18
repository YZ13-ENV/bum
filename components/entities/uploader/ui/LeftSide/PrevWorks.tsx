'use client'
import { getDrafts } from '@/app/fetchers'
import PrevShotCard from '@/components/entities/uploader/ui/LeftSide/PrevShotCard'
import { DocShotData } from '@/types'
import { auth } from '@/utils/app'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const PrevWorks = () => {
    const [user] = useAuthState(auth)
    const [shots, setShots] = useState<DocShotData[]>([])
    useEffect(() => {
        if (user) getDrafts(user.uid)
        .then(shots => setShots(shots))
    },[user])
    return (
        <>
            {
                shots.length === 0
                ? <div className='flex flex-col items-center justify-center w-full h-full'>
                    <span className='text-xs text-center text-neutral-400'>Нет последних работ</span>
                </div>
                :
                <div className="grid w-full gap-4 h-fit search_grid">
                    {
                        shots.map((shot, index) => 
                            <PrevShotCard key={index} block={shot} />
                        )
                    }
                </div>
            }
        </>
    )
}

export default PrevWorks