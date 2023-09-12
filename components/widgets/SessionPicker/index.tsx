'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import Image from 'next/image'
import { useState } from 'react'
import UserSelect from './ui/UserSelect'
import { setSession } from '@/components/entities/session/session'
import { Button } from 'antd'
import { BiX } from 'react-icons/bi'

const SessionPicker = () => {
    const session = useAppSelector(state => state.watcher.session)
    const [forcedClose, setForcedClose] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const signIn = async() => {
        const updatedSession = {
            ...session,
            uid: selectedUser
        }
        dispatch(setSession(updatedSession))
    }
    if (forcedClose || session.uid || session.uids.length === 0 || session.uid && session.uids.length === 0) return null
    return (
        <div className='absolute z-50 flex flex-col w-full max-w-sm p-4 border top-3 right-3 h-fit rounded-xl border-neutral-700 bg-neutral-900'>
            <div className="relative flex items-center justify-center w-full gap-2 h-fit">
                <Image src='/DarkMaterial.svg' width={36} height={36} alt='root-logo' />
                <span className='text-lg font-semibold text-neutral-200'>Dark Material</span>
                <Button onClick={() => setForcedClose(true)} className='!absolute !right-0 !px-2' type='default'><BiX size={20} /></Button>
            </div>
            <div className="flex flex-col w-full py-4 h-fit">
                <div className="flex flex-col w-full px-3 h-fit rounded-2xl bg-neutral-950">
                    {
                        session.uids.map(uid => 
                            <UserSelect key={uid} selectedUser={selectedUser} setSelectedUser={setSelectedUser} uid={uid} />
                        )
                    }
                    {/* <div className="flex items-center w-full gap-2 px-2 py-4 h-fit">
                        <div className='w-10 h-10 rounded-full shrink-0 bg-neutral-800' />
                        <div className="flex flex-col w-full h-full gap-1">
                            <span className='font-semibold text-neutral-200'>DarkMaterialCEO</span>
                            <span className='text-xs text-neutral-400'>yz13@darkmaterial.space</span>
                        </div>
                    </div> */}
                </div>
            </div>
            <Button onClick={signIn} disabled={!selectedUser} className='w-full'>{ selectedUser ? 'Продолжить' : 'Выберите пользователя' }</Button>
        </div>
    )
}

export default SessionPicker