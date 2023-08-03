import UploadShot from '@/components/pages/UploadShot';
import React from 'react'
import { cookies } from 'next/headers'
import { DocShotData } from '@/types';
const getPrevShots = async() => {
    const cookie = cookies()
    const uid = cookie.get("uid")
    if (uid) {
        try {
            const res = await fetch(`http://localhost:3000/api/shots/draftsList?userId=${uid.value}`)
            const shots: DocShotData[] = await res.json()
            console.log(shots);
            return shots
        } catch(e) {
            console.log(e);
            return []
        }
    } else return null
}
const UploadShotPage = async() => {
    const prevShots = await getPrevShots()
    if (!prevShots) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <span className='text-sm'>Не удалось получить пользователя, попробуйте ещё раз</span>
            </div>
        )
    }
    return (
        <UploadShot prevShots={prevShots} />
    )
}

export default UploadShotPage