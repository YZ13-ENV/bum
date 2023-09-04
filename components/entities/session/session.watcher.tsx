'use client'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useCookieState, useDebounceEffect, useLocalStorageState } from 'ahooks'
import { Session, setSession } from './session'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/utils/app'
import { useSearchParams } from 'next/navigation'
import { signInWithCustomToken } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { getHost } from '@/helpers/getHost'
import { isEqual } from 'lodash'
import { verifyToken } from '@/helpers/token'
import { uploadSession } from '@/helpers/session'
const SessionWatcher = () => {
  const [sid, setSid] = useLocalStorageState<string | null>( 'sid', { defaultValue: null } );
  const [user] = useAuthState(auth)
  const session = useAppSelector(state => state.watcher.session)
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  const token = params.get('token')
  const handleUploadSession = useCallback(async() => await uploadSession(session), [session])
  const setLocalSession = useCallback(async(sid: string) => {
    const extractedSession = await verifyToken(sid) as { sid: string } | null
    if (extractedSession) dispatch(setSession({ ...session, sid: extractedSession.sid }))

  }, [dispatch, session])
  const getToken = useCallback(async(uid: string) => {
    const fetchUrl = `${getHost()}/users/token?userId=${uid}`
    try {
      const res = await fetch(fetchUrl)
      if (res.ok) {
        const token = await res.json()
        signInWithCustomToken(auth, token)
      }
    } catch(e) {

    }
  }, [])
  const [debouncedSession, setDebouncedSession] = useState<Session | null>(null)
  useDebounceEffect(() => {
    if (!token) {
      if (session.sid === '' && sid) setLocalSession(sid)
    }
  }, [session.sid, sid, user, setLocalSession], { wait: 2000 })
  useDebounceEffect(() => {
    if (session.uid && !user) {
      getToken(session.uid)
    }
    if (user && session.uid) {
      if (session.uid !== user.uid) {
        auth.signOut()
        getToken(session.uid)
      }
    }
    if (!sid && !session.uid && user) {
      auth.signOut()
    }
  }, [session, user, getToken], { wait: 1000, maxWait: 3000 })
  useDebounceEffect(() => {
    if (!isEqual(debouncedSession, session)) {
      console.log('Session is need update')
      handleUploadSession()
      .finally(() => {
        dispatch(setSession(session))
        setDebouncedSession(session)
      })
    } else console.log('Session is not need update')
  }, [session, handleUploadSession], { wait: 2000, maxWait: 10000 })
  useLayoutEffect(() => {
    if (session.sid) {
      const sessionRef = doc(db, 'sessions', session.sid)
      onSnapshot(sessionRef, sessionSnap => {
        if (sessionSnap.exists()) {
          if (!isEqual(sessionSnap.data() as Session, session)) dispatch(setSession(sessionSnap.data() as Session))
        }
      })
    }
  },[session.sid])
    return (
      <></>
    )
}

export default SessionWatcher