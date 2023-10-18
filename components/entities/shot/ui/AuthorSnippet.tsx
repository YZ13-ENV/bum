import { getUserShort } from '@/app/fetchers'
import Avatar from '@/components/shared/Avatar'
import Link from 'next/link'
import React from 'react'

type Props = {
    uid: string
}
const AuthorSnippet = async({ uid }: Props) => {
    const user = await getUserShort(uid)
    const isSub = user?.isSubscriber || false
    return (
        <Link href={`/${user?.displayName}`}>
            <Avatar src={user ? user.photoUrl : null} size={26} noLabel isSub={isSub} direction='left' />
        </Link>
    )
}

export default AuthorSnippet