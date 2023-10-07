import Chunker from '../ChunkModule/Chunker'

type Props = {
    userId: string
}
const ProfileContent = ({ userId }: Props) => {
    return <Chunker countPrefix={`/shots/user/count/${userId}/new`} shotsPrefix={`/shots/user/${userId}/new`} />
}

export default ProfileContent