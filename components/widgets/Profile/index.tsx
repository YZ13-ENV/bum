import Drafts from './ui/Drafts'
import { DocShotData } from '@/types'
import UserChunker from '../ChunkModule/UserChunker'

type Props = {
    userId: string
    tab: number | null
    shots: DocShotData[]
}
const ProfileContent = ({ userId, tab, shots }: Props) => {
    if (tab === 3) return null // <Edit />
    if (tab === 2) return <Drafts shots={shots} />
    return <UserChunker userId={userId} />
}

export default ProfileContent