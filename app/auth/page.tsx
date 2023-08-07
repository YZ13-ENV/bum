import AuthHub from '@/components/widgets/Auth'
import { Button, Input } from 'antd'
import Image from 'next/image'
import React from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'

const AuthPage = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className="flex flex-col w-full max-w-md gap-4 p-8 border h-[32rem] rounded-xl shrink-0 bg-neutral-900 border-neutral-700">

                <AuthHub />
            </div>
        </div>
    )
}

export default AuthPage