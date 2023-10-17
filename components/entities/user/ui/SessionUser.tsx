import { getHost } from '@/helpers/getHost'
import { ShortUserData } from '@/types'
import { useLayoutEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Session, setSession } from '../../session/session'
import { BiCheck, BiLoaderAlt } from 'react-icons/bi'
import Avatar from '@/components/shared/Avatar'
type Props = {
    setExpand: React.Dispatch<React.SetStateAction<boolean>>
    uid: string
}
const SessionUser = ({ uid, setExpand }: Props) => {
    const session = useAppSelector(state => state.watcher.session)
    const [loading, setLoading] = useState<boolean>(false)
    const isSelected = session.uid === uid
    const dispatch = useAppDispatch()
    const [userData, setUserData] = useState<ShortUserData | null>(null)
    const updateSession = () => {
        const updatedSession: Session = {
            ...session,
            uid: uid
        }
        dispatch(setSession(updatedSession))
    }
    const fetchData = async() => {
        try {
            const userRes = await fetch(`${getHost()}/users/shortData?userId=${uid}`, { method: 'GET', next: { revalidate: 1800 } })
            const user: { short: ShortUserData } | null = await userRes.json()
            setUserData(user ? user?.short : null)
        } catch(e) {

        }
    }
    const changeUser = () => {
        if (session.uid !== uid) {
            setLoading(true)
            updateSession()
            setTimeout(() => {
                setLoading(false)
                setTimeout(() => {
                    setExpand(false)
                }, 1000);
            }, 2000);
        }
    }
    useLayoutEffect(() => {
        fetchData()
    },[uid])
    if (!userData) return (
        <div className="flex items-center w-full gap-2 h-fit">
            <div className='w-8 h-8 rounded-full shrink-0 bg-neutral-800' />
            <div className="flex flex-col justify-center w-full h-full gap-1">
                <div className="w-1/2 h-4 rounded-full bg-neutral-800" />
                <div className="w-full h-4 rounded-full bg-neutral-800" />
            </div>
        </div>
    )
    return (
        <div onClick={changeUser} className="flex items-center w-full gap-2 cursor-pointer h-fit">
            <div className="relative shrink-0">
                <Avatar src={userData?.photoUrl || '/EmptyUser.svg'} size={32} />
                {
                    loading ?
                    <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 rounded-full">
                        <BiLoaderAlt size={32} className='animate-spin' />
                    </div>
                    : isSelected && 
                    <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 bg-green-600 rounded-full">
                        <BiCheck className='text-white' size={18} />
                    </div>
                }
            </div>
            <div className="flex flex-col w-full h-full">
                <span className='text-sm font-semibold line-clamp-1 text-neutral-200'>{
                    userData?.displayName ? userData.displayName.length <= 30 ? userData.displayName : userData.displayName.substring(0, 20) + '...' : 'Пользователь'
                }</span>
                <span className='text-xs text-neutral-400'>{userData?.email}</span>
            </div>
        </div>
    )
}

export default SessionUser