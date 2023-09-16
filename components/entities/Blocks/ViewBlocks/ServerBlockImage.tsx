const LoadedImage = dynamic(() => import('@/components/shared/LoadedImage'))
import { fetchFile } from '@/helpers/fetchFile'
import { ImageBlock } from '@/types'
import dynamic from 'next/dynamic'
// const getUrl = async(link: string) => {
//     const url = await fetchFile(link)
//     return url
// }
type Props = {
    withAmbiLight?: boolean
    block: ImageBlock
    quality?: number
    object?: 'cover' | 'contain' 
}
const ServerBlockImage = async({ block, withAmbiLight=false, object='contain', quality=75 }: Props) => {
    return (
        <LoadedImage withAmbiLight={withAmbiLight} link={fetchFile(block.link)} object={object} quality={quality} />
    )
}

export default ServerBlockImage