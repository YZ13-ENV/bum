'use client'
import { getHost } from '@/helpers/getHost'
import { auth } from '@/utils/app'
import { Button } from 'antd'
import { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiUserCircle, BiUserMinus, BiUserPlus } from 'react-icons/bi'

type Props = {
    profileUID: string
}
const FollowButton = ({ profileUID }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [isFollowed, setFollowed] = useState<boolean>(false)
    const [user] = useAuthState(auth)
    const checkFollow = async() => {
        if (user) {
            setLoading(true)
            const res = await fetch(`${getHost()}/users/isInFollowList?userId=${user.uid}&followId=${profileUID}`)
            if (res.ok) {
                const isInList: boolean = await res.json()
                setFollowed(isInList)
                // console.log(isInList)
                setLoading(false)
            } else {
                setFollowed(false)
                setLoading(false)
            }
        }
    }
    const startFollow = async() => {
        if (user) {
            setLoading(true)
            await fetch(`${getHost()}/users/startFollow?userId=${user.uid}&followId=${profileUID}`, { method: 'POST' })
            checkFollow()
            setLoading(false)
        }
    }
    const stopFollow = async() => {
        if (user) {
            setLoading(true)
            await fetch(`${getHost()}/users/stopFollow?userId=${user.uid}&followId=${profileUID}`, { method: 'POST' })
            checkFollow()
            setLoading(false)
        }
    }
    useLayoutEffect(() => {
        checkFollow()
    },[user])
    return (
        <Button loading={loading} size='large' icon={user?.uid === profileUID ? <BiUserCircle size={17} className='inline-block mb-0.5' /> : isFollowed ? <BiUserMinus size={17} className='inline-block mb-0.5' /> : <BiUserPlus size={17} className='inline-block mb-0.5' /> } danger={isFollowed}
        onClick={isFollowed ? stopFollow : startFollow} disabled={!user || user.uid === profileUID} type={isFollowed ? 'default' : 'primary'}
        >{user?.uid === profileUID ? 'Это вы' : isFollowed ? 'Отписаться' : 'Отслеживать'}</Button>
    )
}

export default FollowButton