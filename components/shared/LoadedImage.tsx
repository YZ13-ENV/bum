import Image from 'next/image'

type Props = {
    link: string
    quality?: number
    object?: 'cover' | 'contain' 
}
const LoadedImage = ({ link, quality=75, object='contain' }: Props) => {
    return (
        <Image loading="lazy" fill src={link} unoptimized={link.includes('.gif') ? true : false} placeholder='blur' blurDataURL={link}
        className={`!relative ${object === 'contain' ? 'object-contain !h-fit' : '!h-full object-cover'}  rounded-xl`} 
        alt='block-image' quality={quality} />
    )
}

export default LoadedImage