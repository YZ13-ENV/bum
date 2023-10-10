'use client'
import { DocShotData } from '@/types'
import { Badge, Button, Dropdown, MenuProps, Space } from 'antd'
import { useLayoutEffect, useMemo, useState } from 'react'
import { BiDotsVerticalRounded, BiHeart, BiSolidHeart, BiSolidMessageRoundedDots, BiSolidShow, BiTrashAlt } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { getHost } from '@/helpers/getHost'
import { useRouter } from 'next/navigation'
import { largeNumber } from '@/helpers/largeNumbers'

type Props = {
    shot: DocShotData
    isOnPage?: boolean
    isSub?: boolean
}
const ShotActions = ({ shot, isSub=false, isOnPage=false }: Props) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const [likes, setLikes] = useState<string[]>(shot.likes)
    const isInclude = useMemo(() => user ? likes.includes(user.uid) : false, [user, likes]) 
    const addOrRemoveLike = async() => {
        if (user) {
            setLoading(true)
            try {
                const res = await fetch(`${getHost()}/shots/addOrRemoveLikes?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                    method: 'PATCH'
                })
                if (res.ok) {
                    if (isInclude) {
                        const updatedLikes = likes.filter(uid => uid !== user.uid)
                        setLikes(updatedLikes)
                    } 
                    if (!isInclude) {
                        setLikes([...likes, user.uid])
                    }
                }
                setLoading(false)
            } catch(e) {
                setLoading(false)
                console.log(e)
            }
        }
    }
    const deleteShot = async() => {
        if (user) {
            setLoading(true)            
            const res = await fetch(`${getHost()}/shots/shot/${shot.doc_id}/${user.uid}`, { method: "DELETE" })
            const text = await res.text()
            // console.log(text)
            if (res.ok) router.push('/')
            setLoading(false)
        }
    }
    const addViews = async() => {
        if (user) {
            setLoading(true)
            await fetch(`${getHost()}/shots/addView?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                method: 'PATCH'
            })
            setLoading(false)
        }
    }
    const items: MenuProps['items'] = [
        {
            key: 0,
            label: 'Удалить',
            icon: <BiTrashAlt size={13} className='inline mr-1'  />,
            danger: true,
            onClick: deleteShot
        }
    ]
    useLayoutEffect(() => {
        if (user && isOnPage) addViews()
    },[user, isOnPage])
    if (isOnPage) {
        return (
            <>
                <Button onClick={addOrRemoveLike} loading={loading} size='large'
                danger={isInclude} type={isInclude ? 'primary' : 'default'} 
                icon={<BiHeart  size={13} className='inline my-auto mb-0.5 mr-1' />}>{likes.length}</Button>
                {
                    (user && user.uid === shot.authorId) && 
                    <Dropdown menu={{items}}>
                        <Button size='large'><BiDotsVerticalRounded size={17} /></Button>
                    </Dropdown>
                }
            </>
        )
    }
    return (
        <>
            <Badge count={shot.likes.length} size='small' color='white'>
                <Button loading={loading} danger={isInclude} type={isInclude ? 'primary' : 'default'}
                onClick={addOrRemoveLike} size='small' className='!w-8 !h-8 !flex !items-center !justify-center !rounded-lg'><BiHeart /></Button>
            </Badge>
            { 
                shot.needFeedback && 
                <Badge count={shot.comments.length} size='small' color='white'>
                    <Button size='small' className='!w-8 !h-8 !flex !items-center !justify-center !rounded-lg'><BiSolidMessageRoundedDots /></Button>
                </Badge>
            }
            <Badge count={shot.views.length} size='small' color='white' overflowCount={999_999}> 
                <Button size='small' className='!w-8 !h-8 !flex !items-center !justify-center !rounded-lg'><BiSolidShow /></Button>
            </Badge>
        </>
    )

}

export default ShotActions