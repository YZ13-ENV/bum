import { useAppSelector } from '../store/store'
import { useDebounceEffect } from 'ahooks'
import { ShotForUpload } from '@/types'
import { uploadShot_POST } from '@/helpers/shot'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { useState } from 'react'
import { isEqual } from 'lodash'
import { message } from 'antd'

const UploaderWatcher = () => {
    const [user] = useAuthState(auth)
    const modals = useAppSelector(state => state.uploader.modals)
    const draft = useAppSelector(state => state.uploader.draft)
    const [debouncedShot, setDebouncedShot] = useState<ShotForUpload | null>(null)
    const uploadShot = async(userId: string, shotId: string, shot: ShotForUpload) => {
        if (!debouncedShot || !isEqual(shot, debouncedShot)) {
            try {
                message.info('Синхронизируем')
                await uploadShot_POST(userId, shotId, shot)
                setDebouncedShot(shot)
            } catch(e) {
                message.error('Ошибка при синхронизации')
            }
        }
    }
    useDebounceEffect(() => {
        if (modals.draftId && user && modals.finalTouchModal === false) {
            uploadShot(user.uid, modals.draftId, draft)
        }
    }, [modals.draftId, modals.finalTouchModal, draft, user], { wait: 10000 })
    return (
        <></>
    )
}

export default UploaderWatcher