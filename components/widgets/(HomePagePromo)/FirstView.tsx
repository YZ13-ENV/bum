import React from 'react'
import AppPreviewBlock from '../AppPreviewBlock'
import { Button, Space } from 'antd'

const FirstView = () => {
    return (
        <div className='relative flex flex-col items-center justify-center w-full mx-auto h-fit'>
            <div className="flex flex-col items-center justify-center gap-8 my-6 md:my-24 w-fit h-fit">
                <div className="flex flex-col items-center justify-center w-full gap-4 h-fit">
                    <h1 className="text-6xl font-semibold text-center text-neutral-200 lg:text-7xl">За руку по миру дизайна</h1>
                    <p className="mt-2 text-base lg:text-lg text-neutral-400">Место для встречи идей и открытий</p>
                </div>
                <Space direction="horizontal" size='middle'>
                    <Button size='large' type='text' href='/shots/popular'>К работам</Button>
                    <Button size='large' type='primary' href="https://darkmaterial.space/auth/signin?back_url=https://bum.darkmaterial.space">Войти в аккаунт</Button>
                </Space>
            </div>
            <AppPreviewBlock />
        </div>
    )
}

export default FirstView