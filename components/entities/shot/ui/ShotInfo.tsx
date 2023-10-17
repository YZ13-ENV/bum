import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import ShotActions from './ShotActions'
import Link from 'next/link'
import Avatar from '@/components/shared/Avatar'
import { Popover } from 'antd'
import AuthorPreview from './AuthorPreview'

type Props = {
    shot: DocShotData
}
const getShortData = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', next: { revalidate: 1800 } })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        console.log(e)
        return null
    }
}
const ShotInfo = async({ shot }: Props) => {
    const user = await getShortData(shot.authorId)
    const isSub = user?.isSubscriber || false
    const isVideo = (shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link).includes('.mp4')
    const content = (
        <AuthorPreview uid={shot.authorId} user={user} />
    )
    return (
        <div className={`absolute bottom-0 left-0 z-20 flex items-center justify-between w-full gap-2 px-4 py-2 ${isVideo ? 'group-hover:opacity-0 hover:!opacity-100' : ''} rounded-b-xl h-fit bg-gradient-to-t from-black to-transparent`}>
            <h2 className='text-base font-medium text-neutral-200 line-clamp-1'>{shot.title}</h2>
            <div className="flex items-center gap-2 p-1 pl-3 bg-black rounded-full shrink-0 w-fit h-fit">
                <ShotActions shot={shot} isSub={isSub} />
                <Popover content={content} placement='top' trigger={['hover']}>
                    <Link href={`/${user?.displayName}`}>
                        <Avatar src={user ? user.photoUrl : null} size={26} noLabel isSub={isSub} direction='left' />
                    </Link>
                </Popover>
            </div>
        </div>
    )
}

export default ShotInfo