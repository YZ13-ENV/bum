import { setEmail } from '@/components/entities/authProcess/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { Input } from 'antd'
import React from 'react'

const Email = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.auth.email)
    return (
        <Input size='large' value={email} onChange={e => dispatch(setEmail(e.target.value))} placeholder='Почта' />
    )
}

export default Email