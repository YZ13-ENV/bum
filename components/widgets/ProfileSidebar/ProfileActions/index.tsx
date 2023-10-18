import FollowButton from '@/components/shared/FollowButton'
import React from 'react'

type Props = {
    uid: string
}
const ProfileActions = ({ uid }: Props) => {
    return (
        <div className="flex items-center justify-center w-full gap-2 h-fit">
            <FollowButton mini profileUID={uid} />
        </div>
    )
}

export default ProfileActions