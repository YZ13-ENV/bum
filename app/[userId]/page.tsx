import ShotCard from '@/components/entities/shot'
import ProfileContent from '@/components/widgets/Profile'
import UserProfileTabs from '@/components/widgets/UserProfileTabs'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import { BiUser } from 'react-icons/bi'

type Props = {
    params: {
        userId: string
    },
    searchParams: {
        tab: string | null
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${params.userId}`, { method: 'GET', cache: 'no-cache' })
        const user: { short: ShortUserData } | null = await userRes.json()
        return {
            title: user?.short.displayName || 'Пользователь',
          }
    } catch(e) {
        return {
            title: 'Ошибка'
        }
    }
 

}
const getShots = async(userId: string, tab: string | null) => {
    const stableTab = !tab ? 1 : parseInt(tab)
    try {
        const shotsRes = await fetch(`${getHost()}/shots/${stableTab === 1 ? 'onlyShots' : 'onlyDrafts'}?userId=${userId}`, { cache: 'no-cache' })
        const shots: DocShotData[] = await shotsRes.json()
        return shots
    } catch(e) {
        console.log(e)
        return null
    }

}
const getUserShort = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', cache: 'no-cache' })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        console.log(e)
        return null
    }

}

const UserPage = async({ params, searchParams }: Props) => {
    const shots = await getShots(params.userId, searchParams.tab)
    const user = await getUserShort(params.userId)
    // console.log(searchParams)
    return (
        <section className='flex flex-col w-full h-full'>
            <div className="relative flex flex-col items-center w-full gap-4 px-4 py-2 md:px-12 border-y h-fit shrink-0 border-neutral-700">
                <div className="flex items-center w-full gap-2 h-fit">
                    {
                        user
                        ? user.photoUrl
                        ? <Image src={user.photoUrl} className="border rounded-full border-neutral-800" width={64} height={64} alt='photo-url' />
                        : <div className="flex items-center justify-center w-16 h-16 border rounded-full border-neutral-800 bg-neutral-700">
                            <BiUser size={32} />
                        </div>
                        : <div className="flex items-center justify-center w-16 h-16 border rounded-full border-neutral-800 bg-neutral-700" />
                    }
                    <div className="flex flex-col justify-center w-full h-full">
                        <span className='text-xl font-semibold text-neutral-200'>{user?.displayName || 'Пользователь'}</span>
                        <span className='text-xs text-neutral-400'>{user?.email || ''}</span>
                    </div>
                </div>
            </div>
            <div className="w-full h-full px-4 pt-4 md:px-12 md:profile_grid profile_grid_mobile">
                <div className="flex flex-col w-full h-full gap-4">
                    <UserProfileTabs shotsLength={shots?.length || 0} profileUID={params.userId} />
                    <ProfileContent tab={parseInt(searchParams.tab || '1')} shots={shots || []} />
                </div>
            </div>

        </section>
    )
}

export default UserPage