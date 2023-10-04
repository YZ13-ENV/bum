'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Nav = () => {
    const pathname = usePathname()
    const isActive = (pathname: string, targetPath: string) => pathname === targetPath ? 'text-black bg-white' : 'text-neutral-300 bg-neutral-900'
    return (
        <div className="flex flex-col items-center justify-center w-full gap-2 sm:flex-row h-fit">
            <Link href='/terms' className={`px-3 py-1 text-sm rounded-lg ${isActive(pathname, '/terms')}`}>Условия пользования</Link>
            <Link href='/privacy' className={`px-3 py-1 text-sm rounded-lg ${isActive(pathname, '/privacy')}`}>Политика конфиденциальности</Link>
            <Link href='/cookies' className={`px-3 py-1 text-sm rounded-lg ${isActive(pathname, '/cookies')}`}>Использование Cookie</Link>
        </div>
    )
}

export default Nav