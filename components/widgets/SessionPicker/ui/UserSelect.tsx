import Avatar from '@/components/shared/Avatar'
import { getHost } from '@/helpers/getHost'
import { ShortUserData } from '@/types'
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'

type Props = {
    uid: string
    selectedUser: string | null,
    setSelectedUser: Dispatch<SetStateAction<string | null>>
}
const UserSelect = ({ selectedUser, setSelectedUser, uid }: Props) => {
    const isSelected = selectedUser === uid
    const [userData, setUserData] = useState<ShortUserData | null>(null)
    const fetchData = async() => {
        try {
            const userRes = await fetch(`${getHost()}/users/shortData?userId=${uid}`, { method: 'GET', next: { revalidate: 3600 } })
            const user: { short: ShortUserData } | null = await userRes.json()
            setUserData(user ? user?.short : null)
        } catch(e) {

        }
    }
    useLayoutEffect(() => {
        fetchData()
    },[uid])
    return (
        <div onClick={() => setSelectedUser( isSelected ? null : uid )} 
        className="flex items-center w-full gap-2 px-2 py-4 border-b border-transparent h-fit">
            <div className="relative shrink-0">
                <Avatar src={userData?.photoUrl || '/EmptyUser.svg'} size={40} />
                {
                    isSelected && 
                    <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
                        <BiCheck className='text-white' size={32} />
                    </div>
                }
            </div>
            <div className="flex flex-col w-full h-full gap-1">
                <span className='font-semibold text-neutral-200'>{userData?.displayName}</span>
                <span className='text-xs text-neutral-400'>{userData?.email}</span>
            </div>
        </div>
    )
}

export default UserSelect