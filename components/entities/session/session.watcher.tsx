'use client'
import React, { useLayoutEffect } from 'react'
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
import { generateSidToken } from '@/helpers/token'
const SessionWatcher = () => {
    const [sid, setSid] = useLocalStorageState<string | null>( 'sid', { defaultValue: null } );
    const [cookie, setCookie] = useCookieState('uid')
    const [user] = useAuthState(auth)
    const session = useAppSelector(state => state.watcher.session)
    const dispatch = useAppDispatch()
    const params = useSearchParams()
    const token = params.get('token')
    const uploadSession = async() => {
      // Вынести в helpers
      try {
        const sessionToken = await generateSidToken(session)
        if (!sessionToken) throw new Error('Failed while generated token')
        const fetchUrl = `${getHost()}/auth/session?sessionToken=${sessionToken}`
        await fetch(fetchUrl, { method: 'POST' })
      } catch(e) {
        console.log(e)
      }
    }
    const getToken = async(uid: string) => {
      // Вынести в helpers
      const fetchUrl = `${getHost()}/users/token?userId=${uid}`
      try {
        const res = await fetch(fetchUrl)
        if (res.ok) {
          const token = await res.json()
          signInWithCustomToken(auth, token)
          .then(user => {
            if (user.user) {
              setCookie(user.user.uid)
            }
          })
        }
      } catch(e) {

      }
    }
    useDebounceEffect(() => {
      if (!token) {
        if (session.sid !== '' && !sid) {
          setSid(session.sid)
        }
        if (session.sid === '' && sid) {
          dispatch(setSession({ ...session, sid: sid }))
        }
      }
    }, [session.sid, sid, user], { wait: 2000 })
    useDebounceEffect(() => {
      uploadSession()
    }, [session], { wait: 2000, maxWait: 10000 })
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
      if (!session.uid && user) {
        auth.signOut()
      }
    }, [session, user], { wait: 1000, maxWait: 5000 })
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