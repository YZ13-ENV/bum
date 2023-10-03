'use client'
import { Button, Space } from 'antd'
import Error from 'next/error'
import React, { useEffect } from 'react'


type Props = {
    error: Error,
    reset: () => void
}
const ErrorPage = ({ error, reset }: Props) => {

    useEffect(() => {
        console.log(error)
    },[])
    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-4 p-4'>
            <h1 className='text-3xl font-semibold text-neutral-200'>Что-то пошло не так!</h1>
            <Space direction='horizontal' size='middle'>
                <Button href='/shots/popular' type='primary'>Вернуться</Button>
                <Button onClick={reset} type='default'>Попробовать ещё раз</Button>
            </Space>
        </div>
    )
}

export default ErrorPage