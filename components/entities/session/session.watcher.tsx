'use client'
import { useCallback, useLayoutEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useCookieState, useDebounceEffect, useLocalStorageState } from 'ahooks'
import { Session, setSession } from './session'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/utils/app'
import { signInWithCustomToken } from 'firebase/auth'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { getHost } from '@/helpers/getHost'
import { isEqual } from 'lodash'
import { verifyToken } from '@/helpers/token'
import { uploadSession } from '@/helpers/session'
import { useSearchParams } from 'next/navigation'
import { message } from 'antd'
const SessionWatcher = () => {
  const [sid] = useLocalStorageState<string | null>( 'sid', { defaultValue: null } );
  const [user, loading] = useAuthState(auth)
  const session = useAppSelector(state => state.watcher.session)
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  const tokenParam = params.get('token')
  const [uid, setUid] = useCookieState('uid');
  const handleUploadSession = useCallback(async() => await uploadSession(session), [session])
  const [messageApi, contextHolder] = message.useMessage();
  const setLocalSession = async(sid: string) => {
    const extractedSession = await verifyToken(sid) as { sid: string } | null
    if (extractedSession) {
      const local_session: Session = { ...session, sid: extractedSession.sid }
      return local_session
    } else null
  }
  const getToken = async(uid: string) => {
    const fetchUrl = `${getHost()}/users/token?userId=${uid}`
    try {
      const res = await fetch(fetchUrl)
      if (res.ok) {
        const token = await res.json()
        signInWithCustomToken(auth, token)
        .then(() => setUid(uid))
      }
    } catch(e) {

    }
  }
  const [debouncedSession, setDebouncedSession] = useState<Session | null>(null)
  useLayoutEffect(() => {
    process.env.NODE_ENV === 'development' && console.info(session.sid, session?.uid, user?.uid, sid)
  },[session, sid, user?.uid])
  const getCatchSession = (): Promise<Session | null> => new Promise(async(res, rej) => {
    if (sid && !tokenParam) {
      const local_session = await setLocalSession(sid)
      if (local_session && local_session.sid) {
      const sessionRef = doc(db, 'sessions', local_session.sid)
        const db_session = await getDoc(sessionRef)
        if (db_session.exists()) {
          res(db_session.data() as Session)
        } else res(null)
      } else res(null)
    } else res(null)
  })
  const manipulateSession = () => new Promise(async(res, ref) => {
    if (!loading && session.sid !== '') {
      if ((session.uid && user) && session.uid !== user.uid) {
        getToken(session.uid)
        messageApi.info('Пользователь обновился');
      }
      if (session.uid && !user) {
        getToken(session.uid)
      }
      if (!session.uid && user) {
        const sessionNoUser = {
          ...session,
          uid: null
        }
        dispatch(setSession(sessionNoUser))
        auth.signOut()
        setUid('')
      }
    }
  })
  useDebounceEffect(() => {
    if (!isEqual(debouncedSession, session) && session.sid) {
      console.log('Session is need update')
      handleUploadSession()
      .finally(() => {
        dispatch(setSession(session))
        setDebouncedSession(session)
      })
    } else console.log('Session is not need update')
  }, [session], { wait: 1000 })
  useLayoutEffect(() => {
    manipulateSession()
  }, [session.uid, user])
  useLayoutEffect(() => {
    getCatchSession()
    .then(session => session && dispatch(setSession(session)))
  }, [session.sid, sid, tokenParam])
  useLayoutEffect(() => {
    if (session.sid) {
      const sessionRef = doc(db, 'sessions', session.sid)
      onSnapshot(sessionRef, sessionSnap => {
        process.env.NODE_ENV === 'development' && console.log('session update is coming')
        if (sessionSnap.exists() && !isEqual(sessionSnap.data() as Session, session)) {
          const session = sessionSnap.data() as Session
          dispatch(setSession(session))
          setDebouncedSession(session)
        } 
      })
    }
  },[session.sid])
    return (
      <></>
    )
}

export default SessionWatcher