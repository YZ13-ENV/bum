import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import ShotActions from './ShotActions'
import Link from 'next/link'
import Avatar from '@/components/shared/Avatar'
import { Button, Popover } from 'antd'
import { BiRightArrowAlt } from 'react-icons/bi'
import AuthorPreview from './AuthorPreview'

type Props = {
    shot: DocShotData
}
const getShortData = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', next: { revalidate: 3600 } })
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
    const content = (
        <AuthorPreview uid={shot.authorId} user={user} />
    )
    return (
        <div className='absolute bottom-0 left-0 z-20 flex items-center justify-between w-full gap-2 px-4 py-2 h-fit bg-gradient-to-t from-black to-transparent'>
            <h2 className='text-base font-medium text-neutral-200 line-clamp-1'>{shot.title}</h2>
            <div className="flex items-center gap-2 shrink-0 w-fit h-fit">
                <Popover content={content} placement='top' trigger={['hover']}>
                    <Link href={`/${shot.authorId}`}>
                        <Avatar src={user ? user.photoUrl : null} size={32} noLabel isSub={isSub} direction='left' />
                    </Link>
                </Popover>
                <ShotActions shot={shot} isSub={isSub} />
            </div>
        </div>
    )
}

export default ShotInfo