'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'
import { BiLeftArrowAlt, BiUser } from 'react-icons/bi'
import Email from '../Email'
import PasswordField from '../PasswordField'
import { getHost } from '@/helpers/getHost'
import { setStep, setUserInProcess } from '@/components/entities/authProcess/store'
import { ShortUserData } from '@/types'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'

const SignIn = () => {
    const authSignIn = useAppSelector(state => state.auth)
    const authText = authSignIn.step === 'email' 
    ? 'Введите почту прикрепленную к аккаунту' : authSignIn.step === 'password' 
    ? `Введите пароль от аккаунта с почтой ${authSignIn.userInProcess?.email}`: null
    const dispatch = useAppDispatch()
    const checkEmailStep = async() => {
        if (authSignIn.email.length >= 10 && authSignIn.email.includes('@')) {
            const res = await fetch(`${getHost()}/users/shortByEmail?email=${authSignIn.email}`)
            const resData: { short: ShortUserData } = await res.json()
            console.log(resData);
            
            if (resData) {
                dispatch(setUserInProcess(resData.short))
                dispatch(setStep('password'))
            }
        }
    }
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const signIn = () => {
        if (authSignIn.password.length >= 6 && authSignIn.email.length >= 10 && authSignIn.email.includes('@')) {
            signInWithEmailAndPassword(authSignIn.email, authSignIn.password)
            .then(creds => {
                if (creds && creds.user) {
                    fetch(`${getHost()}/auth/authComplete?email=${creds.user.email}`)
                }
            })
        }
    }
    if (user) {
        return (
            <div className="flex flex-col items-center w-full h-full gap-6">
                {
                    user.user.photoURL ? 
                    <Image src={user.user.photoURL} className='rounded-full' width={64} height={64} alt='user-photo' />
                    : <div className='flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800'>
                        <BiUser size={27} />
                    </div>
                }
                <span className='text-2xl font-semibold text-neutral-200'>Привет, {user.user.displayName}</span>
                <div className="w-full mt-auto h-fit">
                    <Button type='primary' size='large' block href='/'>Вернуться</Button>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="relative flex items-center justify-center w-full gap-2 h-fit">
                <Button href='/' className='!absolute !left-0 !top-0 !px-2' type='text'><BiLeftArrowAlt size={23} /></Button>
                <Image src='/Dey.svg' width={48} height={48} alt='id-service-logo' />
                <div className="w-0.5 h-full bg-neutral-700"></div>
                <Image src='/DarkMaterial.svg' width={48} height={48} alt='id-service-logo' />
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-2 h-fit">
                <span className='text-xl font-semibold text-center text-neutral-200'>Вход в аккаунт</span>
                <span className='text-sm font-medium text-center text-neutral-400'>{authText}</span>
            </div>
            {
                authSignIn.step === 'email'
                ? <Email />
                : authSignIn.step === "password"
                ? <PasswordField />
                : null
            }
            <div className="w-full mt-auto">
                <Button loading={loading || authSignIn.loading} onClick={
                    authSignIn.step === 'email' ? () => checkEmailStep() :
                    authSignIn.step === 'password' ? () => signIn() : () => null
                } size='large' block type='primary'>Продолжить</Button>
            </div>
        </>
    )
}

export default SignIn