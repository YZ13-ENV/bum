import LoadedImage from '@/components/shared/LoadedImage'
import LoadedVideo from '@/components/shared/LoadedVideo'
import { fetchFile } from '@/helpers/fetchFile'
import { memo } from 'react'

type MediaBlockProps = {
    link: string
    quality?: number
    object?: 'cover' | 'contain' 
    autoPlay?: boolean
    withAmbiLight?: boolean
    asBlob?: boolean
    forcedType?: 'image' | 'video'
}
const MediaBlock = ({ withAmbiLight=false, forcedType, asBlob=false, link, quality=75, object='contain', autoPlay=false }: MediaBlockProps) => {
    const type = forcedType ? forcedType : link.endsWith('.mp4') ? 'video' : 'image'
    const preparedLink = asBlob ? link : fetchFile(link)
    if (process.env.NODE_ENV === 'development') {
        // if (type === "image") return <LoadedImage withAmbiLight={withAmbiLight} link={'/original-error.png'} object={object} quality={quality} />
        // if (type === "video") return <LoadedVideo withAmbiLight={withAmbiLight} link={'/dev-video.mp4'} />
    }
    if (link !== '') {
        if (type === "image") {
            return <LoadedImage withAmbiLight={withAmbiLight} link={preparedLink} object={object} quality={quality} />
        } else return <LoadedVideo link={preparedLink} withAmbiLight={withAmbiLight} autoPlay={autoPlay} />
    }
    return null
}

export default memo(MediaBlock)