'use client'
import UserStatus from '@/components/entities/user'
import { auth } from '@/utils/app'
import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const HomeHeader = () => {
    const [user] = useAuthState(auth)
    return (
        <header className="flex items-center justify-between w-full max-w-5xl p-2 px-4 mx-auto border h-fit border-neutral-800 rounded-xl shrink-0">
            <div className="flex items-center h-full gap-2 w-fit">
                <Link href='https://darkmaterial.space'>
                    <Image src='/DM.svg' width={24} height={24} alt='bum-logo' />
                </Link>
                <span className="text-xl font-medium text-neutral-400">/</span>
                <Link href='/shots/popular' className="inline-flex items-center gap-2">
                    <Image src='/bum.svg' width={24} height={24} alt='bum-logo' />
                    <span className="text-xl font-medium text-neutral-300">bum</span>
                </Link>
            </div>
            {
                user
                ? <UserStatus />
                :
                <div className="flex items-center h-full gap-2 w-fit">
                    <Button href='https://darkmaterial.space/auth/signin?back_url=https://bum.darkmaterial.space'
                    size='large' type='text'>Войти</Button>
                    <Button href='https://darkmaterial.space/auth/signup?back_url=https://bum.darkmaterial.space'
                    size='large' type='default'>Регистрация</Button>
                </div>
            }
        </header>
    )
}

export default HomeHeader