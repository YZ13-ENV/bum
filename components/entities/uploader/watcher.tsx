import { useAppDispatch, useAppSelector } from '../store/store'
import { useDebounceEffect } from 'ahooks'
import { ShotForUpload } from '@/types'
import { uploadShot_POST } from '@/helpers/shot'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { useLayoutEffect, useState } from 'react'
import { isEqual } from 'lodash'
import { message } from 'antd'
import { setSubscribeState } from '../user/store'

const UploaderWatcher = () => {
    const [user] = useAuthState(auth)
    const modals = useAppSelector(state => state.uploader.modals)
    const draft = useAppSelector(state => state.uploader.draft)
    const [debouncedShot, setDebouncedShot] = useState<ShotForUpload | null>(null)
    const dispatch = useAppDispatch()
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
    const checkIsSubscriber = async() => {
        if (user) {
            const res = await user.getIdTokenResult()
            const claims = res.claims
            if (claims && claims.isSubscriber) {
                dispatch(setSubscribeState(claims.isSubscriber as boolean || undefined ? claims.isSubscriber as boolean : false))
            }
            if (claims && !claims.isSubscriber) dispatch(setSubscribeState(false))
        } else dispatch(setSubscribeState(false))
    }
    useLayoutEffect(() => {
        checkIsSubscriber()
    },[user?.uid])
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