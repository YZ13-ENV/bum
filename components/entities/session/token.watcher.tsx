'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useLayoutEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useLocalStorageState } from 'ahooks'
import { setSession } from './session'
import { getHost } from '@/helpers/getHost'

const TokenWatcher = () => {
    const params = useSearchParams()
    const router = useRouter()
    const token = params.get('token')
    const [sid, setSid] = useLocalStorageState<string | null>( 'sid', { defaultValue: null } );
    const dispatch = useAppDispatch()
    const session = useAppSelector(state => state.watcher.session)
    const extractToken = () => {
        const isInclude = params.toString().includes('token')
        if (isInclude) {
            const token = params.get("token")
            if (token) {
                getSession(token)
                const extractToken = params.toString().replace(`token=${params.get('token')}`, '')
                router.push(`?${extractToken}`)
            }
        }
    }
    const getSession = async(sid: string) => {
        try {

            const fetchUrl = `${getHost()}/auth/session?sid=${sid}`
            const res = await fetch(fetchUrl)
            if (res.ok) {
                const session = await res.json()
                if (session) {
                    dispatch(setSession(session))
                    setSid(token)
                }
            }
        } catch(e) {
            console.log(e)
        }
    }
    useLayoutEffect(() => {
        if (token && token !== '') {
            extractToken()
        }
    },[token])
    return (
        <></>
    )
}

export default TokenWatcher