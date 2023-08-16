import { Button } from 'antd'
import React from 'react'
import { BiShare } from 'react-icons/bi'
import { useMediaQuery } from 'react-responsive'
import UserStatus from '@/components/entities/user'
import { auth } from '@/utils/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import SearchSection from './SearchSection'
const UserSection = () => {
    const [user] = useAuthState(auth)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    return (
        <div className="flex items-center gap-2 md:gap-4 shrink-0 w-fit h-fit">
            <SearchSection />
            { user && 
                <Button size='large' type='primary' href='/uploads/shot' icon={<BiShare size={17} className='inline mb-0.5' />}>
                { isTabletOrMobile ? '' : 'Поделиться работой'}</Button> 
            }
            <UserStatus />
        </div>
    )
}

export default UserSection