import Image from 'next/image'
import React from 'react'
import { v4 } from 'uuid'

type Props = {
    src: string | null
    size: number
}
const Avatar = ({ size, src }: Props) => {
    return (
        <Image src={src ? src : '/EmptyUser.svg'} className='rounded-full shrink-0' width={size} height={size} alt={v4()} />
    )
}

export default Avatar