'use client'
import React from 'react'

type Props = {
    userId: string
}
const UserRow = ({ userId }: Props) => {
    return (
        <div className="flex items-center w-full h-full gap-2">
            <div className="w-6 h-6 rounded-full shrink-0 bg-neutral-700"></div>
            <span className='text-sm font-medium line-clamp-1 text-neutral-300'>{userId}</span>
        </div>
    )
}

export default UserRow