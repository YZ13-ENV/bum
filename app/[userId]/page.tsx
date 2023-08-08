import ShotCard from '@/components/entities/shot'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Button, Segmented } from 'antd'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import React from 'react'
import { BiLogOut, BiPencil, BiUser } from 'react-icons/bi'

type Props = {
    params: {
        userId: string
    }
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
 

    const userRes = await fetch(`${getHost()}/users/shortData?userId=${params.userId}`, { method: 'GET' })
    const user: { short: ShortUserData } | null = await userRes.json()
 
  return {
    title: user?.short.displayName || 'Пользователь',
  }
}
const getShortData = async(userId: string) => {
    try {
        const shotsRes = await fetch(`${getHost()}/shots/onlyShots?userId=${userId}&asDoc=true`)
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
        <section className='flex items-start w-full h-full gap-4 p-20'>
            <div className="relative flex flex-col items-center h-full gap-4 px-4 pt-20 pb-4 border w-80 shrink-0 rounded-xl border-neutral-700">
                {
                    data && data.user
                    ? data.user.photoUrl
                    ? <Image src={data.user.photoUrl} className="absolute border rounded-full -top-16 border-neutral-800" width={128} height={128} alt='photo-url' />
                    : <div className="absolute flex items-center justify-center w-32 h-32 border rounded-full -top-16 border-neutral-800 bg-neutral-700">
                        <BiUser size={32} />
                    </div>
                    : <div className="absolute flex items-center justify-center w-32 h-32 border rounded-full -top-16 border-neutral-800 bg-neutral-700" />
                }
                <div className="flex flex-col justify-center w-full gap-1 h-fit">
                    <span className='text-xl font-bold text-center text-neutral-200'>{data?.user?.displayName || 'Пользователь'}</span>
                    <span className='text-sm text-center text-neutral-400'>{data?.user?.email || 'Нет почты'}</span>
                </div>
                <Button block size='large' type='primary' icon={<BiPencil size={17} className='inline' />} >Редактировать профиль</Button>
                <div className="w-full mt-auto">
                    <Button block size='large' danger type='link' icon={<BiLogOut size={17} className='inline' />}>Выйти из профиля</Button>
                </div>
            </div>
            <div className="flex flex-col w-full h-full gap-2">
                <div className="w-full h-fit">
                    <Segmented options={['Публикации', 'Черновики']} size='large' />
                </div>
                <div className="flex flex-col w-full h-full gap-2 p-4 overflow-y-auto border rounded-xl border-neutral-700">
                {
                    <div className="grid w-full grid-cols-1 grid-rows-3 gap-9 shrink-0 xl:grid-cols-3 xl:grid-rows-1 home_grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-rows-2 md:grid-rows-2 sm:grid-rows-2">
                            {
                                data && data.shots.map((shotChunk, index) => 
                                    <ShotCard key={`shotChunk#${index}#shot#${index + 1}`} shot={shotChunk} />
                                )
                            }
                        </div>
                }
                </div>
            </div>
        </section>
    )
}

export default UserPage