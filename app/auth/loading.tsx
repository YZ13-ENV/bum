import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

const Loading = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'><BiLoaderAlt className='animate-spin' size={25} /></div>
    )
}

export default Loading