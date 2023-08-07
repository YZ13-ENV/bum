import { Button } from 'antd'
import React from 'react'
import { BiShare } from 'react-icons/bi'
import { useMediaQuery } from 'react-responsive'
import UserStatus from '@/components/entities/User'
import { auth } from '@/utils/app'
import { useAuthState } from 'react-firebase-hooks/auth'
const UserSection = () => {
    const [user] = useAuthState(auth)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    return (
        <div className="flex items-center gap-4 shrink-0 w-fit h-fit">
            { user && <Button size='large'
            href='/uploads/shot'>{isTabletOrMobile ? <BiShare size={17} className='inline' /> : 'Поделиться работой'}</Button> }
            <UserStatus />
        </div>
    )
}

export default UserSection