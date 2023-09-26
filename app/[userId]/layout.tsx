import React from 'react'
import { getUserShort } from './helpers'
import SubLabel from '@/components/shared/SubLabel'
import Avatar from '@/components/shared/Avatar'
import ProfileSidebar from '@/components/widgets/ProfileSidebar'

type Props = {
    params: {
        userId: string
    },
    children: React.ReactNode
}
const UserLayout = async({ children, params }: Props) => {
    const user = await getUserShort(params.userId)
    if (!user) return (
        null
    )
    return (
        <div className="flex flex-row items-start w-full gap-4 px-4 pt-4 h-fit shot_wrapper md:px-12">
            <div className="flex flex-col h-full gap-4 w-fit">
                <div className="flex items-center justify-center w-full gap-2 h-fit">
                    { user && <Avatar src={user.photoUrl} size={42} /> }
                    <div className="flex-col justify-center hidden h-full md:flex w-fit">
                        <div className="flex items-center gap-1 w-fit h-fit">
                            <span className='font-medium text text-neutral-200'>{user.displayName || 'Пользователь'}</span>
                            { user.isSubscriber && <SubLabel /> }
                        </div>
                        <span className='text-xs text-neutral-400'>{user?.email || ''}</span>
                    </div>
                </div>
                <ProfileSidebar uid={params.userId} />
            </div>
            {children}
        </div>
    )
}

export default UserLayout