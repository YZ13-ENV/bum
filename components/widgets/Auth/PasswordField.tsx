import { setPassword } from '@/components/entities/authProcess/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { Input } from 'antd'
import React from 'react'

const { Password } = Input
const PasswordField = () => {
    const password = useAppSelector(state => state.auth.password)
    const dispatch = useAppDispatch()
    return (
        <Password  size='large' value={password} onChange={e => dispatch(setPassword(e.target.value))} placeholder='Пароль' />
    )
}

export default PasswordField