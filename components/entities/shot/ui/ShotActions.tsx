'use client'
import { DocShotData } from '@/types'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import { useLayoutEffect, useMemo, useState } from 'react'
import { BiDotsVerticalRounded, BiHeart, BiSolidHeart, BiSolidMessageRoundedDots, BiSolidShow, BiTrashAlt } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { getHost } from '@/helpers/getHost'
import { useRouter } from 'next/navigation'

type Props = {
    shot: DocShotData
    isOnPage?: boolean
}
const ShotActions = ({ shot, isOnPage=false }: Props) => {
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
            const res = await fetch(`${getHost()}/shots/shot?userId=${user.uid}&shotId=${shot.doc_id}`, { method: "DELETE" })
            const text = await res.text()
            console.log(text)
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
        <div onClick={e => e.stopPropagation()} className="flex items-center gap-2 p-2 transition-all w-fit h-fit">
            <Button onClick={addOrRemoveLike} loading={loading} size='small' 
            danger={isInclude} type={'text'} className='!text-sm !font-semibold'
            icon={isInclude 
                ? <BiSolidHeart size={15} className='inline my-auto mb-0.5 mr-1' /> 
                : <BiHeart size={15} className='inline my-auto mb-0.5 mr-1' />}>{likes.length}</Button>
            <div className="flex items-center rounded-full w-fit h-fit">
                <Space.Compact>
                    { shot.needFeedback && <Button type='text' shape='round' size='small' className='!text-sm !font-semibold !pr-1' icon={<BiSolidMessageRoundedDots size={15} className='inline my-auto mb-0.5 mr-1' />}>{shot.comments.length}</Button> }
                    <Button type='text' shape='round' size='small' className={`!px-1 !text-sm !font-semibold`} icon={<BiSolidShow size={15} className='inline my-auto mb-0.5 mr-1' />}>{shot.views.length}</Button>
                </Space.Compact>
            </div>
        </div>
    )
}

export default ShotActions