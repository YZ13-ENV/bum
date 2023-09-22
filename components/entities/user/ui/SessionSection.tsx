'use client'
import { useState } from 'react'
import { useAppSelector } from '../../store/store'
import SessionUser from './SessionUser'
import { BiChevronRight, BiChevronUp } from 'react-icons/bi'
import { PiUsersThree } from 'react-icons/pi'
const SessionSection = () => {
    const [expand, setExpand] = useState<boolean>(false)
    const session = useAppSelector(state => state.watcher.session)
    if (session.uids.length <= 1) return null
    if (!expand) {
        return (
            <>
                <div onClick={() => setExpand(true)} className='flex items-center justify-between gap-2 py-0.5'>
                    <div className="flex items-center gap-2 shrink-0">
                        <PiUsersThree size={17} className='text-neutral-200' />
                        <span className='font-medium text-neutral-200'>Другие аккаунты</span>
                    </div>
                    <BiChevronRight className='text-neutral-200 shrink-0' size={17} />
                </div>
            </>
        )
    }
    return (
        <div className='flex flex-col gap-2'>
            <div onClick={() => setExpand(false)} className='flex items-center justify-between h-6 gap-2'>
                <div className="flex items-center gap-2 shrink-0">
                    <PiUsersThree size={17} className='text-neutral-200' />
                    <span className='font-medium text-neutral-200'>Скрыть аккаунты</span>
                </div>
                <BiChevronUp className='text-neutral-200 shrink-0' size={17} />
            </div>
            { 
                session.uids.map(uid => <div key={uid + 'session'}>
                    <SessionUser setExpand={setExpand} uid={uid} />
                </div>
            )}
        </div>
    )
}

export default SessionSection