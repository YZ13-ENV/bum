'use client'
import { auth } from '@/utils/app'
import { Segmented, Button, SegmentedProps, Select } from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import FollowButton from './ui/FollowButton'
import { useRouter } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'

type Props = {
    profileUID: string
    shotsLength: number
}
const UserProfileTabs = ({ shotsLength, profileUID }: Props) => {
    const [segment, setSegment] = useState<number>(1)
    const router = useRouter()
    const [user] = useAuthState(auth)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const options = [
        {
            value: 1,
            label: 'Публикации'
        },
        {
            value: 2,
            label: 'Черновики',
        }
    ].filter(opt => {
        if (user) {
            if (user.uid !== profileUID && opt.value !== 1) {
                return false
            } else return true
        } else return opt.value === 1
    })
    useLayoutEffect(() => {
        const isSegment = options.findIndex(option => parseInt(option.toString()) === segment)
        if (isSegment) {
            router.push(`?tab=${segment}`)
        }
    },[segment])
    return (
        <div className="flex justify-between w-full h-fit">
            {
                isTabletOrMobile
                ? <Select options={options} value={segment} size='large' onChange={e => setSegment(parseInt(e.toString()))} />
                : <Segmented options={options} size='large' value={segment} onChange={e => setSegment(parseInt(e.toString()))} />
            }
            <div className="flex items-center gap-2 w-fit h-fit">
                <FollowButton profileUID={profileUID} />
            </div>
        </div>
    )
}

export default UserProfileTabs