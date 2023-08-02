'use client'
import { Button } from 'antd'
import React from 'react'

const UploadHeader = () => {
    return (
        <div className="flex items-center justify-between w-full h-16 gap-2 px-4">
            {/* Header */}
            <Button href='/'>Вернуться</Button>
            <div className="flex items-center gap-2 w-fit h-fit">
                <Button>Сохранить в черновик</Button>
                <Button type='primary'>Продолжить</Button>
            </div>
        </div>
    )
}

export default UploadHeader