import ShotCard from '@/components/entities/shot'
import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import { Button, Segmented } from 'antd'
import { chunk } from 'lodash'
import Image from 'next/image'
import React from 'react'
import { BiLogOut, BiPencil, BiUser } from 'react-icons/bi'

type Props = {
    params: {
        userId: string
    }
}
const getShortData = async(userId: string) => {
    try {
        const shotsRes = await fetch(`${getHost()}/api/shots/shotsDocList?userId=${userId}&noDrafts=true`)
        const userRes = await fetch(`${getHost()}/api/user/short?userId=${userId}`, { method: 'GET' })
        const shots: DocShotData[] = await shotsRes.json()
        const user: ShortUserData | null = await userRes.json()
        return { user: user, shots: shots }
    } catch(e) {
        console.log(e)
        return null
    }
}
const UserPage = async({ params }: Props) => {
    const data = await getShortData(params.userId)
    return (
        <section className='flex items-start w-full h-full gap-4 p-20'>
            <div className="relative flex flex-col items-center h-full gap-4 px-4 pt-20 pb-4 w-80 shrink-0 rounded-xl bg-neutral-800">
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
                <div className="flex flex-col w-full h-full gap-2 p-4 rounded-xl bg-neutral-800">
                {
                    data && chunk(data.shots, 4).map((shotChunk, index) => 
                        <div key={`shotChunk#${index}`}
                        className="grid w-full shrink-0 md:h-72 sm:h-[36rem] h-[72rem] grid-cols-1 md:grid-rows-1 sm:grid-rows-2 grid-rows-4 gap-6 md:grid-cols-3 sm:grid-cols-2">
                            {
                                shotChunk.map((shot, shotIndex) => 
                                    <ShotCard key={`shotChunk#${index}#shot#${shotIndex}`} shot={shot} />
                                )
                            }
                        </div>
                    )
                }
                </div>
            </div>
        </section>
    )
}

export default UserPage