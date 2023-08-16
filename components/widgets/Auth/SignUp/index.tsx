import { setAuthType, setStep } from '@/components/entities/authProcess/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { getHost } from '@/helpers/getHost'
import { ShortUserData } from '@/types'
import { auth } from '@/utils/app'
import { useCookieState } from 'ahooks'
import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { BiLeftArrowAlt, BiUser } from 'react-icons/bi'
import Email from '../Email'
import PasswordField from '../PasswordField'
import UpdateProfile from '../UpdateProfile'

const SignUp = () => {
    const [cookie, setCookie] = useCookieState('uid')
    const [authoredUser] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const authSignUp = useAppSelector(state => state.auth)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const authText = authSignUp.step === 'email' 
    ? 'Введите почту которую прикрепите к аккаунту' : authSignUp.step === 'password' 
    ? `Придумайте пароль для аккаунта ${authSignUp.userInProcess?.email || authSignUp.email}`: null
    const authCheck = async(uid: string) => {
        setCookie(uid)
    }
    const checkEmailStep = async() => {
        if (authSignUp.email.length >= 10 && authSignUp.email.includes('@')) {
            try {
                const res = await fetch(`${getHost()}/users/shortByEmail?email=${authSignUp.email}`)
                const resData: { short: ShortUserData } = await res.json()
                if (!resData) {
                    dispatch(setStep('password'))
                }
            } catch(e) {
                console.log(e)
            }

        }
    }
    const signUp = () => {
        if (authSignUp.password.length >= 6 && authSignUp.email.length >= 10 && authSignUp.email.includes('@')) {
            // console.log(user, loading, error)
            createUserWithEmailAndPassword(authSignUp.email, authSignUp.password)
            .then(creds => {
                if (creds && creds.user) {
                    authCheck(creds.user.uid)
                }
            })
        }
    }
    if (authoredUser && user && authoredUser.displayName == null) {
        return (
            <div className="flex flex-col items-center w-full h-full gap-6">
                <UpdateProfile />
            </div>
        )
    }
    if (user || authSignUp.step === 'success') {
        return (
            <div className="flex flex-col items-center w-full h-full gap-6">
                {
                    user?.user.photoURL ? 
                    <Image src={user?.user.photoURL} className='rounded-full' width={64} height={64} alt='user-photo' />
                    : <div className='flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800'>
                        <BiUser size={27} />
                    </div>
                }
                <span className='text-2xl font-semibold text-neutral-200'>Привет, {user?.user.displayName || 'Пользователь'}</span>
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
                <span className='text-xl font-semibold text-center text-neutral-200'>Регистрация аккаунта</span>
                <span className='text-sm font-medium text-center text-neutral-400'>{authText}</span>
            </div>
            {
                authSignUp.step === 'email'
                ? <Email />
                : authSignUp.step === "password"
                ? <PasswordField />
                : null
            }
            <div className="flex flex-col w-full mt-auto">
                <div className="flex items-center justify-center w-full h-fit">
                    <Button onClick={() => dispatch(setAuthType('signIn'))} type='link'>Уже есть аккаунт?</Button>
                </div>
                <Button loading={loading || authSignUp.loading} onClick={
                    authSignUp.step === 'email' ? () => checkEmailStep() :
                    authSignUp.step === 'password' ? () => signUp() : () => null
                } size='large' block type='primary'>Продолжить</Button>
            </div>
        </>
    )
}

export default SignUp