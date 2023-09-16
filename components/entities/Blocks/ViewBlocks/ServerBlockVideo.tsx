const LoadedVideo = dynamic(() => import('@/components/shared/LoadedVideo'))
import { fetchFile } from '@/helpers/fetchFile'
import { VideoBlock } from '@/types'
import dynamic from 'next/dynamic'

type Props = {
    withAmbiLight?: boolean
    block: VideoBlock
    autoPlay?: boolean
}
// const getUrl = async(link: string) => {
//     const url = await fetchFile(link)
//     return url
// }
const ServerBlockVideo = async({ block, withAmbiLight=false, autoPlay=false }: Props) => {
    return (
        <LoadedVideo link={fetchFile(block.link)} withAmbiLight={withAmbiLight} autoPlay={autoPlay} />
    )
}

export default ServerBlockVideo