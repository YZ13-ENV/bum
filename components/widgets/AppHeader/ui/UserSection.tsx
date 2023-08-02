import { Button } from 'antd'
import React from 'react'
import { BiShare } from 'react-icons/bi'
import { useMediaQuery } from 'react-responsive'
const UserSection = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <Button href='/uploads/shot'>{isTabletOrMobile ? <BiShare size={17} className='inline' /> : 'Поделиться работой'}</Button>
            <div className="border rounded-full w-9 h-9 border-neutral-700 bg-neutral-900"></div>
        </div>
    )
}

export default UserSection