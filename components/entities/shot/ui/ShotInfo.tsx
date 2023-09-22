import { getHost } from '@/helpers/getHost'
import { DocShotData, ShortUserData } from '@/types'
import ShotActions from './ShotActions'
import { BiChevronRight } from 'react-icons/bi'
import Link from 'next/link'
import Avatar from '@/components/shared/Avatar'
import { DateTime } from 'luxon'

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
    return (
        <section className='absolute left-0 z-20 flex flex-col w-full transition-all hover:bottom-0 -bottom-20 group/info h-fit'>
            <div className="relative flex items-center justify-between w-full py-1 pl-3 pr-1 bg-opacity-25 h-fit bg-gradient-to-t from-black to-transparent">
                <h2 className='font-bold line-clamp-1 text-neutral-200'>{shot.title}</h2>
                <ShotActions shot={shot} />
            </div>
            <div className="flex flex-col w-full gap-1 px-3 py-2 transition-all duration-300 bg-black rounded-b-xl h-fit shrink-0">
                <Link href={`/${shot.authorId}`} className="flex items-center justify-between w-full gap-2 border rounded-full border-neutral-800 hover:bg-neutral-900 h-fit">
                    <div className="flex items-center h-full gap-2 w-fit">
                        <Avatar src={user ? user.photoUrl : null} size={36} />
                        <div className="flex flex-col h-full w-fit">
                            <span className='inline-flex items-center gap-1 font-semibold line-clamp-1 text-neutral-200'
                            >{user?.displayName} { user?.isSubscriber && <span className="px-2 py-0.5 text-xs text-black bg-white rounded-md">Плюс</span> }</span>
                            <span className='text-xs text-neutral-400'>{user?.email}</span>
                        </div>
                    </div>
                    <BiChevronRight size={25} className='mr-2 text-neutral-400' />
                </Link>
                <time className='text-xs text-neutral-400'>{DateTime.fromSeconds(shot.createdAt).setLocale('ru').toRelative()}</time>
            </div>
        </section>
    )
}

export default ShotInfo