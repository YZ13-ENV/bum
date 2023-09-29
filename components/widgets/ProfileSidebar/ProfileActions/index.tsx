import React from 'react'
import FollowButton from '@/components/widgets/UserProfileTabs/ui/FollowButton'
// import { Button } from 'antd'
// import { BiMessageRounded } from 'react-icons/bi'

type Props = {
    uid: string
}
const ProfileActions = ({ uid }: Props) => {
    return (
        <div className="flex items-center justify-center w-full gap-2 h-fit">
            <FollowButton mini profileUID={uid} />
            {/* <Button disabled size='large'><BiMessageRounded size={17} /></Button> */}
        </div>
    )
}

export default ProfileActions