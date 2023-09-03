'use client'
import { useSearchParams, redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useLocalStorageState } from 'ahooks'
import { Session, setSession } from './session'
import { getHost } from '@/helpers/getHost'
import { verifySidToken } from '@/helpers/token'

const TokenWatcher = () => {
    const params = useSearchParams()
    const token = params.get('token')
    const [sid, setSid] = useLocalStorageState<string | null>( 'sid', { defaultValue: null } );
    const dispatch = useAppDispatch()
    const session = useAppSelector(state => state.watcher.session)
    const extractToken = () => {
        if (token) {
            const extractToken = params.toString().replace(`token=${token}`, '')
            setSid(token)
            // console.log(extractToken)
            return redirect(`?${extractToken}`)
        }
    }
    const getSession = async(sid: string) => {
        try {
            const token = await verifySidToken(sid)
            const fetchUrl = `${getHost()}/auth/session?sid=${token}`
            const res = await fetch(fetchUrl)
            if (res.ok) {
                const session: Session = await res.json()
                if (session) {
                    dispatch(setSession(session))
                }
            }
        } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (token && token !== '') {
            extractToken()
        } else {
            getSession(session.sid)
        }
    },[params, token])
    return (
        <></>
    )
}

export default TokenWatcher