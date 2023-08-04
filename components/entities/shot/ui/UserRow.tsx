'use client'
import { getHost } from '@/helpers/getHost'
import { ShortUserData } from '@/types'
import Image from 'next/image'
import React from 'react'
import { BiUser } from 'react-icons/bi'

type Props = {
    userId: string
}
const UserRow = ({ userId }: Props) => {
    const [shortData, setShortData] = React.useState<ShortUserData | null>(null)
    const getShortData = async() => {
        const userRes = await fetch(`${getHost()}/api/user/short?userId=${userId}`, { method: 'GET' })
        const user: ShortUserData | null = await userRes.json()
        setShortData(user)
    }
    React.useEffect(() => {
        getShortData()
    },[])
    return (
        <div className="flex items-center w-full h-full gap-2">
            {
                    shortData
                    ? shortData.photoUrl
                    ? <Image src={shortData.photoUrl} className="rounded-full " width={32} height={32} alt='photo-url' />
                    : <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-700">
                        <BiUser size={14} />
                    </div>
                    : <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-700">
                        <BiUser size={14} />
                    </div>
            }
            <span className='text-sm font-medium line-clamp-1 text-neutral-300'>{shortData?.displayName || 'Пользователь'}</span>
        </div>
    )
}

export default UserRow