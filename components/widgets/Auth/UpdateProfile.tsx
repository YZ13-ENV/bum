import { useAppDispatch } from '@/components/entities/store/store'
import { auth } from '@/utils/app'
import { Button, Input } from 'antd'
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiUser } from 'react-icons/bi'
import { updateProfile } from 'firebase/auth'
import { setStep } from '@/components/entities/authProcess/store'

const UpdateProfile = () => {
    const [user] = useAuthState(auth)
    const [userName, setUserName] = React.useState<string>("")
    const dispatch = useAppDispatch()
    const saveAndContinue = async() => {
        if (userName.length >= 1 && user) {
            await updateProfile(user, { displayName: userName })
            dispatch(setStep('success'))
        }
    }
    return (
        <div className='flex flex-col items-center w-full h-full gap-6'>
            <div className="flex items-center justify-center w-full gap-3 h-fit">
                {
                    user && user.photoURL ? 
                    <Image src={user.photoURL} className='rounded-full shrink-0' width={64} height={64} alt='user-photo' />
                    : <div className='flex items-center justify-center w-16 h-16 rounded-full shrink-0 bg-neutral-800'>
                        <BiUser size={27} />
                    </div>
                }
                <div className="flex flex-col justify-center h-full w-fit">
                    <span className='text-lg font-semibold text-neutral-200'>{user?.displayName || userName || 'Пользователь'}</span>
                    <span className='text-sm text-neutral-400'>{user?.email}</span>
                </div>
            </div>
            <Input value={userName} onChange={e => setUserName(e.target.value)}
            size='large' placeholder='Под каким именем пользователи вас будут узнавать?' />
            <div className="w-full mt-auto">
                <Button onClick={saveAndContinue} type='primary' disabled={userName.length === 0} size='large' block>Сохранить и продолжить</Button>
            </div>
        </div>
    )
}

export default UpdateProfile