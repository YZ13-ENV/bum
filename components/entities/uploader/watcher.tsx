import { useAppSelector } from '../store/store'
import { useDebounceEffect } from 'ahooks'
import { ShotForUpload } from '@/types'
import { uploadShot_POST } from '@/helpers/shot'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { useState } from 'react'
import { isEqual } from 'lodash'

const UploaderWatcher = () => {
    const [user] = useAuthState(auth)
    const modals = useAppSelector(state => state.uploader.modals)
    const draft = useAppSelector(state => state.uploader.draft)
    const [debouncedShot, setDebouncedShot] = useState<ShotForUpload | null>(null)
    const uploadShot = async(userId: string, shotId: string, shot: ShotForUpload) => {
        if (!debouncedShot || !isEqual(shot, debouncedShot)) {
            await uploadShot_POST(userId, shotId, shot)
            setDebouncedShot(shot)
        }
    }
    useDebounceEffect(() => {
        if (modals.draftId && user && modals.finalTouchModal === false) {
            uploadShot(user.uid, modals.draftId, draft)
        }
    }, [modals.draftId, modals.finalTouchModal, draft, user], { maxWait: 2000, wait: 1000 })
    return (
        <></>
    )
}

export default UploaderWatcher