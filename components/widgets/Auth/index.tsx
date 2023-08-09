'use client'
import React from 'react'
import SignIn from './SignIn'
import { useAppSelector } from '@/components/entities/store/store'
import SignUp from './SignUp'

const AuthHub = () => {
    const authType = useAppSelector(state => state.auth.authType)
    if (authType === "signIn") return (
        <SignIn />
    ) 
    return <SignUp />
}

export default AuthHub