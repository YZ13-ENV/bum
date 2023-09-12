import Image from 'next/image'
import ImageAmbiLight from '../widgets/AmbiLight/ImageAmbiLight'

export type LoadedImageProps = {
    withAmbiLight?: boolean
    link: string
    quality?: number
    object?: 'cover' | 'contain' 
}
const LoadedImage = ({ link, quality=75, object='contain', withAmbiLight }: LoadedImageProps) => {
    if (withAmbiLight) return <ImageAmbiLight link={link} object={object} quality={quality} />
    return (
        <Image priority fill src={link} unoptimized={link.includes('.gif') ? true : false}
        className={`!relative ${object === 'contain' ? 'object-contain !h-fit' : '!h-full object-cover'}  rounded-xl`} 
        alt='block-image' quality={quality} />
    )
}

export default LoadedImage