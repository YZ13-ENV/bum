import VideoAmbiLight from "../widgets/AmbiLight/VideoAmbiLight"

export type LoadedVideoProps = {
    withAmbiLight?: boolean
    link: string
    autoPlay?: boolean
}
const LoadedVideo = ({ withAmbiLight=false, link, autoPlay=false }: LoadedVideoProps) => {
    if (withAmbiLight) return <VideoAmbiLight link={link} autoPlay={autoPlay} />
    return (
        <video src={link} muted className='object-cover w-full h-full rounded-xl' loop autoPlay={autoPlay} controls={false} />
    )
}

export default LoadedVideo