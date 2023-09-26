import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import ShotActions from './ShotActions'
import Link from 'next/link'
import Avatar from '@/components/shared/Avatar'
import { Button, Popover } from 'antd'
import { BiRightArrowAlt } from 'react-icons/bi'

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
    const stableLink = shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link
    const isVideo = stableLink.endsWith('.mp4')
    const content = (
        <div className='flex flex-col w-64 gap-2 h-36'>
            <div className="flex items-center justify-between w-full gap-2 shrink-0 h-fit">
                <div className="flex items-center gap-2 w-fit h-fit">
                    <Avatar src={user ? user.photoUrl : null} size={32} noLabel isSub={isSub} direction='left' />
                    <div className="flex flex-col justify-center w-fit h-fit">
                        <span className='text-base font-medium text-neutral-200'>{user?.displayName || 'Пользователь'}</span>
                        <span className='text-xs text-neutral-400'>{user?.email}</span>
                    </div>
                </div>
                <Button href={`/${shot.authorId}`}><BiRightArrowAlt size={17} /></Button>
            </div>
            <div className="flex items-center w-full h-full gap-2">
                <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2 border rounded-lg border-neutral-700">
                    
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 h-full gap-2 border rounded-lg border-neutral-700">
                    
                </div>
            </div>
        </div>
    )
    return (
        <div className='absolute bottom-0 left-0 z-20 flex items-center justify-between w-full gap-2 px-4 py-2 h-fit bg-gradient-to-t from-black to-transparent'>
            <h2 className='text-base font-medium text-neutral-200 line-clamp-1'>{shot.title}</h2>
            <div className="flex items-center gap-2 shrink-0 w-fit h-fit">
                {/* <Link href={`/${shot.authorId}`}> */}
                <Popover content={content} placement='top' trigger={['hover']}>
                    <Link href={`/${shot.authorId}`}>
                        <Avatar src={user ? user.photoUrl : null} size={32} noLabel isSub={isSub} direction='left' />
                    </Link>
                </Popover>
                {/* </Link> */}
                <ShotActions shot={shot} isSub={isSub} />
            </div>
        </div>
    )
}

export default ShotInfo