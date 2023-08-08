import React from 'react'

type Props = {
    link: string
}
const LoadedVideo = ({ link }: Props) => {
    return (
        <video src={link} muted className='object-cover w-full h-full rounded-xl' loop autoPlay controls={false} />
    )
}

export default LoadedVideo