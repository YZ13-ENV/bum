'use client'
import Banner from '@/components/shared/ui/Banner'
import { auth } from '@/utils/app'
import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const NoUserBanner = () => {
    const [user, loading] = useAuthState(auth)
    if (user || loading) return null
    return (
        <Banner>
            {/* <Image src='/banner.jpg' className='z-0 object-cover rounded-xl' fill alt='banner' /> */}
            {/* <Link className='absolute bottom-3 right-3' href='https://www.artstation.com/johnstone'>Created by John Stone</Link> */}
            <div className="z-40 flex flex-col justify-center w-full h-full max-w-4xl gap-4 p-4 mx-auto md:p-0">
                <div className="flex flex-col w-full gap-2 h-fit">
                    <h1 className='mb-2 text-xl font-bold text-white md:text-6xl'>Изучите работы дизайнеров и создателей контента</h1>
                    <div className="flex flex-col w-full h-fit">
                        <span className='text-sm md:text-lg text-neutral-300'>Dey это только начинающая, но перспективная площадка для дизайнеров и создателей контента.</span>
                        <span className='text-sm md:text-lg text-neutral-300'>Предлагаем загрузить свою первую работу!</span>
                    </div>
                </div>
                <div className="w-fit">
                    <Button size='large' type='primary' href='/auth'>Войти</Button>
                </div>
            </div>
        </Banner>
    )
}

export default NoUserBanner