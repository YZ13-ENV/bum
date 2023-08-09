'use client'
import React from 'react'
import UserSection from './ui/UserSection'
import LogoSection from './ui/LogoSection'
import SearchSection from './ui/SearchSection'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector } from '@/components/entities/store/store'

const AppHeader = () => {
    const path = usePathname()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const isOpen = useAppSelector(state => state.search.isOpen)
    if (path === '/auth') return null
    return (
        <header className="flex items-center justify-between w-full h-16 gap-2 px-4 shrink-0">
            {
                isTabletOrMobile && isOpen ? null
                : <LogoSection />
            }
            <SearchSection />
            {
                isTabletOrMobile && isOpen ? null
                : <UserSection />
            }
        </header>
    )
}

export default AppHeader