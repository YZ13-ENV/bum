'use client'
import React from 'react'

type Props = {
    searchParams: {
        s: string | null
    }
}
const ViewModal = ({ searchParams }: Props) => {
    return (
        <div className='fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50'>
            {searchParams.s}
        </div>
    )
}

export default ViewModal