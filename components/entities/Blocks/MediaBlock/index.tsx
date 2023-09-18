// const ServerBlockImage = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/ServerBlockImage')) 
// const ServerBlockVideo = dynamic(() => import('@/components/entities/Blocks/ViewBlocks/ServerBlockVideo')) 
import LoadedImage from '@/components/shared/LoadedImage'
import LoadedVideo from '@/components/shared/LoadedVideo'
import { fetchFile } from '@/helpers/fetchFile'
// import dynamic from 'next/dynamic'
import { memo } from 'react'

type MediaBlockProps = {
    type: 'image' | 'video'
    link: string
    quality?: number
    object?: 'cover' | 'contain' 
    autoPlay?: boolean
    withAmbiLight?: boolean

}
const MediaBlock = ({ withAmbiLight=false, type, link, quality=75, object='contain', autoPlay=false }: MediaBlockProps) => {
    if (process.env.NODE_ENV === 'development') return <LoadedImage withAmbiLight={withAmbiLight} link={'/original-error.png'} object={object} quality={quality} />
    if (link !== '') {
        if (type === "image") {
            return <LoadedImage withAmbiLight={withAmbiLight} link={fetchFile(link)} object={object} quality={quality} />
        } else return <LoadedVideo link={fetchFile(link)} withAmbiLight={withAmbiLight} autoPlay={autoPlay} />
    }
    return null
}

export default memo(MediaBlock)