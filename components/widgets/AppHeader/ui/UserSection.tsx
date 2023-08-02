import { Button } from 'antd'
import React from 'react'
import { BiShare, BiUser } from 'react-icons/bi'
import { useMediaQuery } from 'react-responsive'
import UserStatus from '@/components/entities/User'
const UserSection = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <Button href='/uploads/shot'>{isTabletOrMobile ? <BiShare size={17} className='inline' /> : 'Поделиться работой'}</Button>
            <UserStatus />
        </div>
    )
}

export default UserSection