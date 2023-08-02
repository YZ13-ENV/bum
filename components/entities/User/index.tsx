import { auth } from '@/utils/app'
import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiUser } from 'react-icons/bi'

const UserStatus = () => {
    const [user, loading] = useAuthState(auth)
    if (user) {
        if (user.photoURL) {
            return <Image src={user.photoURL} className='rounded-full' width={36} height={36} alt='photo-url' />
        } else return <div className="flex items-center justify-center border rounded-full w-9 h-9 border-neutral-700 bg-neutral-900">
            <BiUser size={15} />
        </div>
    } else return <Button type='primary'>Войти</Button>
}

export default UserStatus