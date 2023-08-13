'use client'
import { auth } from '@/utils/app'
import { Segmented, Button, SegmentedProps } from 'antd'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import FollowButton from './ui/FollowButton'

type Props = {
    profileUID: string
    shotsLength: number
}
const UserProfileTabs = ({ shotsLength, profileUID }: Props) => {
    const [user] = useAuthState(auth)
    const options: SegmentedProps['options'] = [
        {
            value: 1,
            label: `Публикации ${shotsLength}`
        },
        {
            value: 2,
            label: 'Черновики',
        },
    ].filter(opt => {
        if (user) {
            if (user.uid !== profileUID && opt.value === 2) {
                return false
            } else return true
        } else return opt.value !== 2
    })
    return (
        <div className="flex justify-between w-full h-fit">
            <Segmented options={options} size='large' />
            <div className="flex items-center gap-2 w-fit h-fit">
                <FollowButton profileUID={profileUID} />
            </div>
        </div>
    )
}

export default UserProfileTabs