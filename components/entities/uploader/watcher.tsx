import React from 'react'
import { useAppSelector } from '../store/store'
import { useDebounceEffect } from 'ahooks'
import { ShotData, ShotForUpload } from '@/types'
import { uploadShot_POST, isShotExist } from '@/helpers/shot'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'

const UploaderWatcher = () => {
    const [user] = useAuthState(auth)
    const modals = useAppSelector(state => state.uploader.modals)
    const draft = useAppSelector(state => state.uploader.draft)
    const [debouncedShot, setDebouncedShot] = React.useState<ShotData | null>(null)
    const uploadShot = async(userId: string, shotId: string, shot: ShotForUpload) => {
        // console.log(userId, shotId, shot)
        await uploadShot_POST(userId, shotId, shot)
        // console.log(uploadedData);
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