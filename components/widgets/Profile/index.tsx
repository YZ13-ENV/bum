// import Drafts from './ui/Drafts'
// import { DocShotData } from '@/types'
// import UserChunker from '../ChunkModule/UserChunker'
import Chunker from '../ChunkModule/Chunker'

type Props = {
    userId: string
}
const ProfileContent = ({ userId }: Props) => {
    // if (tab === 3) return null // <Edit />
    // if (tab === 2) return <Drafts shots={shots} />
    return <Chunker countPrefix={`/shots/user/count/${userId}/new`} shotsPrefix={`/shots/user/${userId}/new`} />
}

export default ProfileContent