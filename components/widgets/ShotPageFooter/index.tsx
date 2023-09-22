import ShotActions from '@/components/entities/shot/ui/ShotActions'
import { DocShotData, ShortUserData } from '@/types'
import { DateTime } from 'luxon'
import Link from 'next/link'
import CommentSection from './ui/CommentSection'
import WorksWrapper from './ui/LastWorks/ui/WorksWrapper'
import Avatar from '@/components/shared/Avatar'
import FollowButton from '../UserProfileTabs/ui/FollowButton'
import { largeNumber } from '@/helpers/largeNumbers'

type Props = {
    shot: DocShotData
    user: ShortUserData
}
const ShotPageFooter = ({ shot, user }: Props) => {
    return (
        <div className="flex md:flex-row flex-col items-start w-full max-w-4xl gap-2 mx-auto h-fit min-h-[24rem]">
            <div className="flex flex-col w-full h-full gap-2 md:w-8/12">
                <div className="flex items-center justify-between w-full h-fit">
                    <div className="flex items-center w-full gap-2 h-fit">
                        <Link href={`/${shot.authorId}`} className="flex items-center gap-2 w-fit h-fit">
                            <Avatar src={user.photoUrl} size={36} direction='right' isSub={user.isSubscriber || false} />
                            <span className='text-lg font-bold text-neutral-200'>{user.displayName.length <= 30 ? user.displayName : user.displayName.substring(0, 30) + '...' || 'Пользователь'}</span>
                        </Link>
                        <FollowButton profileUID={shot.authorId} />
                    </div>
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <ShotActions shot={shot} isOnPage />
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2 p-2 h-fit rounded-xl bg-neutral-900">
                    <div className="flex items-center justify-between w-full h-fit">
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <span className='text-sm text-neutral-300'>{largeNumber(shot.views.length)} просмотров</span>
                            <span className='text-sm text-neutral-300'>{DateTime.fromSeconds(shot.createdAt).setLocale('ru').toLocaleString(DateTime.DATE_MED)}</span>
                        </div>
                        <div className="flex items-center w-fit h-fit">
                        </div>
                    </div>
                    {
                        shot.tags.length !== 0 &&
                        <div className="inline-flex flex-wrap w-full gap-1 h-fit">
                            {
                                shot.tags.map((tag, index) => <Link key={tag + index} href={`/tags/${tag}`}
                                    className='px-2 py-0.5 text-xs rounded-full border border-neutral-700 text-neutral-300 bg-neutral-800'>{tag}</Link>
                                )
                            }
                        </div>
                    }

                </div>
                <CommentSection shot={shot} />
            </div>
            <WorksWrapper userId={shot.authorId} shotId={shot.doc_id} />
        </div>
    )
}

export default ShotPageFooter