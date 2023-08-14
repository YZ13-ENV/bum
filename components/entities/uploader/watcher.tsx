import React from 'react'
import { useAppSelector } from '../store/store'
import { useDebounceEffect } from 'ahooks'
import { ShotData, ShotForUpload } from '@/types'
import { uploadShot_POST, isShotExist } from '@/helpers/shot'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'

const UploaderWatcher = () => {
    const [user] = useAuthState(auth)
    const uploader = useAppSelector(state => state.uploader)
    const [debouncedShot, setDebouncedShot] = React.useState<ShotData | null>(null)
    const uploadShot = async(userId: string, shotId: string, shot: ShotForUpload) => {
        await uploadShot_POST(userId, shotId, shot)
        // console.log(uploadedData);
    }
    useDebounceEffect(() => {
        if (uploader.draftId && user && uploader.finalTouchModal === false) {
            uploadShot(user.uid, uploader.draftId, uploader.shot)
        }
    }, [uploader, user], { maxWait: 2000, wait: 1000 })
    return (
        <></>
    )
}

export default UploaderWatcher