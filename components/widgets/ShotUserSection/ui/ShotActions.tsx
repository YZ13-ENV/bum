'use client'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import { auth } from '@/utils/app'
import { Button, Dropdown, MenuProps, Popover, QRCode } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiHeart, BiBookmark, BiTrashAlt, BiDotsVerticalRounded, BiQr } from 'react-icons/bi'

type Props = {
    shot: DocShotData
}
const ShotActions = ({ shot }: Props) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const addViews = async() => {
        if (user) {
            setLoading(true)
            await fetch(`${getHost()}/shots/addView?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                method: 'PATCH'
            })
            setLoading(false)
        }
    }
    const deleteShot = async() => {
        if (user) {
            setLoading(true)            
            const res = await fetch(`${getHost()}/shots/shot?userId=${user.uid}&shotId=${shot.doc_id}`, { method: "DELETE" })
            const text = await res.text()
            console.log(text)
            if (res.ok) router.push(`/${user.uid}`)
            setLoading(false)
        }
    }
        useLayoutEffect(() => {
            if (user) addViews()
        },[user])
        const items: MenuProps['items'] = [
            {
                key: 0,
                label: 'Удалить',
                icon: <BiTrashAlt size={13} className='inline mr-1'  />,
                danger: true,
                onClick: deleteShot
            }
        ]
    const content = (
        <QRCode value={`https://design.darkmaterial.space/${shot.authorId}/${shot.doc_id}`} />
    )
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <Popover content={content}>
                <Button><BiQr size={17} /></Button>
            </Popover>
            
            {
                (user && user.uid === shot.authorId) && 
                <Dropdown menu={{items}}>
                    <Button><BiDotsVerticalRounded size={17} /></Button>
                </Dropdown>
            }
        </div>
    )
}

export default ShotActions