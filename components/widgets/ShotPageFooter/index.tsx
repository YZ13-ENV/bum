import ShotActions from '@/components/entities/shot/ui/ShotActions'
import { DocShotData, ShortUserData } from '@/types'
import Link from 'next/link'
import CommentSection from './ui/CommentSection'
import WorksWrapper from './ui/LastWorks/ui/WorksWrapper'
import Avatar from '@/components/shared/Avatar'
import FollowButton from '../UserProfileTabs/ui/FollowButton'
import ViewsAndTags from './ui/ViewsAndTags'

type Props = {
    shot: DocShotData
    user: ShortUserData
}
const ShotPageFooter = ({ shot, user }: Props) => {
    return (
        <div className="flex md:flex-row flex-col items-start w-full max-w-4xl gap-2 mx-auto h-fit min-h-[24rem]">
            <div className="flex flex-col w-full h-full gap-2 md:w-8/12">
                <div className="flex flex-col items-center justify-between w-full gap-2 md:flex-row h-fit">
                    <div className="flex items-center justify-between w-full gap-2 md:justify-start h-fit">
                        <Link href={`/${user.displayName}`} className="flex items-center gap-2 w-fit h-fit">
                            <Avatar src={user.photoUrl} size={36} direction='right' isSub={user.isSubscriber || false} />
                            <span className='text-lg font-bold text-neutral-200'>{user.displayName.length <= 30 ? user.displayName : user.displayName.substring(0, 30) + '...' || 'Пользователь'}</span>
                        </Link>
                        <FollowButton profileUID={shot.authorId} />
                    </div>
                    <div className="flex items-center justify-between w-full gap-2 md:w-fit md:justify-start h-fit">
                        <ShotActions shot={shot} isOnPage />
                    </div>
                </div>
                <ViewsAndTags createdAt={shot.createdAt} tags={shot.tags} views={shot.views} />
                <CommentSection shot={shot} />
            </div>
            <WorksWrapper userId={shot.authorId} shotId={shot.doc_id} />
        </div>
    )
}

export default ShotPageFooter