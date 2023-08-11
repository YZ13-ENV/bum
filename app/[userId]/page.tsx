import ShotCard from '@/components/entities/shot'
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
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${params.userId}`, { method: 'GET' })
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
const getShortData = async(userId: string) => {
    try {
        const shotsRes = await fetch(`${getHost()}/shots/onlyShots?userId=${userId}&asDoc=true`, {
            cache: 'no-cache'
        })
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET' })
        const shots: DocShotData[] = await shotsRes.json()
        const user: { short: ShortUserData } | null = await userRes.json()
        return { user: user ? user.short : null, shots: shots }
    } catch(e) {
        console.log(e)
        return null
    }
}
const UserPage = async({ params }: Props) => {
    const data = await getShortData(params.userId)
    return (
        <section className='flex flex-col w-full h-full'>
            <div className="relative flex flex-col items-center w-full gap-4 px-4 py-2 md:px-20 px:py-10 border-y h-fit shrink-0 border-neutral-700">
                <div className="flex items-center w-full gap-2 h-fit">
                    {
                        data && data.user
                        ? data.user.photoUrl
                        ? <Image src={data.user.photoUrl} className="border rounded-full border-neutral-800" width={64} height={64} alt='photo-url' />
                        : <div className="flex items-center justify-center w-16 h-16 border rounded-full border-neutral-800 bg-neutral-700">
                            <BiUser size={32} />
                        </div>
                        : <div className="flex items-center justify-center w-16 h-16 border rounded-full border-neutral-800 bg-neutral-700" />
                    }
                    <div className="flex flex-col justify-center w-full h-full">
                        <span className='text-xl font-semibold text-neutral-200'>{data?.user?.displayName || 'Пользователь'}</span>
                        <span className='text-xs text-neutral-400'>{data?.user?.email || ''}</span>
                    </div>
                </div>
            </div>
            <div className="w-full h-full px-4 pt-4 md:px-20 md:profile_grid profile_grid_mobile">
                <div className="flex flex-col w-full h-full gap-4">
                    <UserProfileTabs shotsLength={data?.shots.length || 0} profileUID={params.userId} />
                    <div className="grid w-full grid-cols-1 grid-rows-4 gap-9 shrink-0 xl:grid-cols-3 xl:grid-rows-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-rows-2 md:grid-rows-2 sm:grid-rows-2">
                            {
                                data && data.shots.map((shotChunk, index) => 
                                    <ShotCard key={`shotChunk#${index}#shot#${index + 1}`} shot={shotChunk} />
                                )
                            }
                    </div>
                </div>
            </div>

        </section>
    )
}

export default UserPage