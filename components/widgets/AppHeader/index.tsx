'use client'
import React from 'react'
import UserSection from './ui/UserSection'
import LogoSection from './ui/LogoSection'
import SearchSection from './ui/SearchSection'
import { usePathname } from 'next/navigation'

const AppHeader = () => {
    const path = usePathname()
    if (path === '/auth') return null
    return (
        <header className="flex items-center justify-between w-full h-16 gap-2 px-4 shrink-0">
            <LogoSection />
            <SearchSection />
            <UserSection />
        </header>
    )
}

export default AppHeader