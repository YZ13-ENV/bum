'use client'
import { useAppSelector } from '@/components/entities/store/store'
import Avatar from '@/components/shared/Avatar'
import { auth } from '@/utils/app'
import { Button } from 'antd'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const Membership = () => {
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    return (
        <section className='flex flex-col items-center justify-start w-full min-h-full px-4'>
            <div className="flex flex-col items-center justify-center w-full gap-4 shrink-0 h-[80vh]">
                <h1 className='font-bold text-center text-9xl'>DM+</h1>
                <span className='text-lg font-medium text-center text-neutral-300'>Расширение возможностей</span>
                <Button href='/membership/request' disabled={isSub} size='large'>{ isSub ? 'У вас уже есть подписка' : 'Запросить'}</Button>
            </div>
            <div className="flex flex-col w-full py-4 h-fit">
                <div className="flex flex-col items-center w-full max-w-6xl gap-2 mx-auto md:flex-row h-fit">
                    <div className="flex flex-col w-full h-64 gap-2 p-4 transition-colors duration-700 border md:w-1/4 rounded-xl border-neutral-600 group hover:border-white">
                        <h3 className='text-lg font-bold transition-colors duration-700 group-hover:text-neutral-200 text-neutral-400'>Уникальный вид иконки профиля</h3>
                        <div className="flex items-center justify-center w-full h-full">
                            <Avatar src={user?.photoURL || null} size={48} isSub />
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-64 gap-2 p-4 transition-colors duration-700 border md:w-1/4 rounded-xl border-neutral-600 group hover:border-white">
                        <h3 className='text-lg font-bold transition-colors duration-700 group-hover:text-neutral-200 text-neutral-400'>Больше возможностей в конструкторе</h3>
                        <div className="flex items-center justify-center w-full h-full">
                            <ul className='px-4'>
                                <li className='text-sm list-disc text-neutral-400'>Больше медиа блоков (10 вместо 5)</li>
                                <li className='text-sm list-disc text-neutral-400'>Возможность загружать видео в каждый блок</li>
                                <li className='text-sm list-disc text-neutral-400'>Обновления раньше остальных</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-64 gap-2 p-4 transition-colors duration-700 border md:w-1/4 rounded-xl border-neutral-600 group hover:border-white">
                        <div className="flex items-center justify-center w-full h-full">
                            <h3 className='text-2xl font-bold text-center transition-colors duration-700 group-hover:text-neutral-200 text-neutral-400'>Ambient подсветка на странице работы</h3>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-64 gap-2 p-4 transition-colors duration-700 border md:w-1/4 rounded-xl border-neutral-600 group hover:border-white">
                        <div className="flex items-center justify-center w-full h-full">
                            <h3 className='text-2xl font-bold text-center transition-colors duration-700 group-hover:text-neutral-200 text-neutral-400'>Всего за ***₽</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Membership