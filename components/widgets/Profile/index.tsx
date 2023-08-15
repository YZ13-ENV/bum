import React from 'react'
import Edit from './ui/Edit'
import Drafts from './ui/Drafts'
import { DocShotData } from '@/types'
import Shots from './ui/Shots'

type Props = {
    tab: number | null
    shots: DocShotData[]
}
const ProfileContent = ({ tab, shots }: Props) => {
    if (tab === 3) return <Edit />
    if (tab === 2) return <Drafts shots={shots} />
    return (
        <Shots shots={shots} />
    )
}

export default ProfileContent