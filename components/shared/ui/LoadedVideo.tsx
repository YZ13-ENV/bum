import React from 'react'

type Props = {
    link: string
    autoPlay?: boolean
}
const LoadedVideo = ({ link, autoPlay=false }: Props) => {
    return (
        <video src={link} muted className='object-cover w-full h-full rounded-xl' loop autoPlay={autoPlay} controls={false} />
    )
}

export default LoadedVideo