import React from 'react'

type Props = {
    children: React.ReactNode
}
const Banner = ({ children }: Props) => {
    return (
        <div className='w-full md:h-[50vh] h-[30vh] relative shrink-0 bg-neutral-900'>
            {children}
        </div>
    )
}

export default Banner