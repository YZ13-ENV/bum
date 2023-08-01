'use client'
import { Button, Input } from 'antd'
import Image from 'next/image'
import React from 'react'

const { Search } = Input
const AppHeader = () => {
    return (
        <header className="flex items-center justify-between w-full h-16 px-4 shrink-0">
            <div className="flex items-center gap-4 w-fit h-fit">
                <Image src='/DM_Design.svg' width={36} height={36} alt="app-logo" />
                <span className='text-2xl font-bold text-neutral-200'>Design</span>
            </div>
            <div className="w-full max-w-xs">
                <Search />
            </div>
            <div className="flex items-center gap-2 w-fit h-fit">
                <Button href='/uploads/shot'>Поделиться работой</Button>
                <div className="border rounded-full w-9 h-9 border-neutral-700 bg-neutral-900"></div>
            </div>
        </header>
    )
}

export default AppHeader