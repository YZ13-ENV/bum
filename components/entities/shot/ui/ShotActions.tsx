'use client'
import { DocShotData } from '@/types'
import { Button, Dropdown, MenuProps } from 'antd'
import { useLayoutEffect, useMemo, useState } from 'react'
import { BiDotsVerticalRounded, BiHeart, BiLoaderAlt, BiSolidHeart, BiSolidMessageRoundedDots, BiSolidShow, BiTrashAlt } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { getHost } from '@/helpers/getHost'
import { useRouter } from 'next/navigation'
import { DateTime } from 'luxon'

type Props = {
    shot: DocShotData
    isOnPage?: boolean
}
const ShotActions = ({ shot, isOnPage=false }: Props) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const [likes, setLikes] = useState<DocShotData['likes']>(shot.likes)
    const isInclude = useMemo(() => user ? likes.findIndex(like => like.uid === user.uid) > -1 : false, [user, likes]) 
    const addOrRemoveLike = async() => {
        if (user) {
            setLoading(true)
            try {
                const res = await fetch(`${getHost()}/shots/addOrRemoveLikes?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                    method: 'PATCH'
                })
                if (res.ok) {
                    if (isInclude) {
                        const updatedLikes = likes.filter(uid => uid.uid !== user.uid)
                        setLikes(updatedLikes)
                    } 
                    if (!isInclude) {
                        const like = {
                            uid: user.uid,
                            createdAt: DateTime.now().toSeconds()
                        }
                        setLikes([...likes, like])
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
                <button onClick={() => addOrRemoveLike()} disabled={!user || loading}
                className={`px-3 py-1 gap-1.5 text-sm rounded-full inline-flex transition-all items-center 
                disabled:bg-neutral-950 disabled:text-neutral-500
                ${isInclude ? 'text-black bg-white' : 'text-neutral-200 bg-neutral-900 hover:bg-neutral-800'}`}>
                    { 
                        loading 
                        ? <BiLoaderAlt size={17} className='inline animate-spin text-inherit' /> 
                        : isInclude 
                        ? <BiSolidHeart size={17} className='inline text-inherit' /> 
                        : <BiHeart  size={17} className='inline text-inherit' /> 
                    }
                    {likes.length}
                </button>
                {/* <Button onClick={addOrRemoveLike} loading={loading}
                danger={isInclude} type={isInclude ? 'primary' : 'default'}
                icon={<BiHeart  size={13} className='inline my-auto mb-0.5 mr-1' />}>{likes.length}</Button> */}
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
            {
                user
                ?
                <button onClick={() => addOrRemoveLike()} disabled={!user || loading}
                className={`text-xs gap-1 rounded-full inline-flex transition-all items-center 
                disabled:bg-neutral-950 disabled:text-neutral-500
                ${isInclude ? 'px-1.5 text-black bg-white' : 'text-neutral-200 bg-neutral-900 hover:bg-neutral-800'}`}>
                        { 
                            loading 
                            ? <BiLoaderAlt size={16} className='inline animate-spin text-inherit' /> 
                            : isInclude 
                            ? <BiSolidHeart size={16} className='inline text-inherit' /> 
                            : <BiHeart  size={16} className='inline text-inherit' /> 
                        }
                        {likes.length}
                </button>
                :
                <div className="flex items-center gap-1 w-fit h-fit">
                    <BiHeart />
                    <span className='text-xs text-neutral-300'>{shot.likes.length}</span>
                </div>
            }
            { 
                shot.needFeedback && 
                <div className="flex items-center gap-1 w-fit h-fit">
                    <BiSolidMessageRoundedDots />
                    <span className='text-xs text-neutral-300'>{shot.comments.length}</span>
                </div>
            }
            <div className="flex items-center gap-1 w-fit h-fit">
                <BiSolidShow />
                <span className='text-xs text-neutral-300'>{shot.views.length}</span>
            </div>
        </>
    )

    // return (
    //     <>
    //         <Badge count={shot.likes.length} size='small' color='white'>
    //             <Button loading={loading} danger={isInclude} type={isInclude ? 'primary' : 'default'}
    //             onClick={addOrRemoveLike} size='small' className='!w-8 !h-8 !flex !items-center !justify-center !rounded-lg'><BiHeart /></Button>
    //         </Badge>
    //         { 
    //             shot.needFeedback && 
    //             <Badge count={shot.comments.length} size='small' color='white'>
    //                 <Button size='small' className='!w-8 !h-8 !flex !items-center !justify-center !rounded-lg'><BiSolidMessageRoundedDots /></Button>
    //             </Badge>
    //         }
    //         <Badge count={shot.views.length} size='small' color='white' overflowCount={999_999}> 
    //             <Button size='small' className='!w-8 !h-8 !flex !items-center !justify-center !rounded-lg'><BiSolidShow /></Button>
    //         </Badge>
    //     </>
    // )

}

export default ShotActions