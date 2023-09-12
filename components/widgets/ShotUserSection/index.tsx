import Link from 'next/link'
import ShotActions from './ui/ShotActions'
import { DocShotData } from '@/types'
import Avatar from '@/components/shared/Avatar'

type Props = {
    photoUrl: string | null
    displayName: string | null
    isSubscriber: boolean
    title: string
    userId: string
    shot: DocShotData
}
const ShotUserSection = ({ isSubscriber, photoUrl, userId, title, displayName, shot }: Props) => {
    return (
        <div className="flex items-center justify-between w-full max-w-2xl gap-1 px-4 py-2 mx-auto bg-black rounded-2xl h-fit">
            <div className="flex items-center w-full gap-4 h-fit">
                <Link href={`/${userId}`}>
                    <Avatar src={photoUrl} size={56} />
                </Link>
                <div className="flex flex-col w-full h-full gap-1">
                    <span className='text-2xl font-bold text-neutral-200'>{title}</span>
                    <div className="flex items-center gap-1 w-fit h-fit">
                        <span className='text-xs text-neutral-400'>{displayName || 'Пользователь'}</span>
                        { isSubscriber && <span className="px-2 py-0.5 text-xs text-black bg-white rounded-md">Плюс</span> }
                    </div>
                </div>
            </div>
            <ShotActions shot={shot} />
        </div>
    )
}

export default ShotUserSection