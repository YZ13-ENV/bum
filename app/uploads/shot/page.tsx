import UploadShot from '@/components/pages/UploadShot';
import React from 'react'
import { cookies } from 'next/headers'
import { DocDraftShotData, DocShotData } from '@/types';
import { Button } from 'antd';
import { getHost } from '@/helpers/getHost';
const getPrevShots = async() => {
    const cookie = cookies()
    const uid = cookie.get("uid")
    if (uid) {
        try {
            const res = await fetch(`${getHost()}/api/shots/list?userId=${uid.value}&drafts=true`)
            const shots: DocDraftShotData[] = await res.json()
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
                <Button href='/'>Вернуться</Button>
            </div>
        )
    }
    return (
        <UploadShot prevShots={prevShots} />
    )
}

export default UploadShotPage