import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Button } from 'antd'
import React from 'react'
import ShotActions from './ShotActions'

type Props = {
    shot: DocShotData
}
const getShortData = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', cache: 'no-cache' })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        console.log(e)
        return null
    }
}
const ShotInfo = async({ shot }: Props) => {
    const user = await getShortData(shot.authorId)
    return (
        <div className="absolute bottom-0 left-0 z-20 flex flex-col w-full h-fit">
            <div className="flex items-center justify-end w-full gap-2 h-fit">
                <div className="relative flex items-center justify-between w-full gap-2 h-fit">
                    <div className="absolute bottom-0 left-0 flex items-center gap-2 p-2 transition-all w-fit h-fit">
                        <Button className='!h-fit' size='small' href={`/${shot.authorId}`}>{user?.displayName || 'Пользователь'}</Button>
                    </div>
                    <ShotActions shot={shot} />
                </div>
            </div>
        </div>
    )
}

export default ShotInfo