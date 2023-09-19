'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'
import UserStatus from '@/components/entities/user'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { BiLoaderAlt, BiSolidMagicWand } from 'react-icons/bi'
import { Button } from 'antd'
import SearchSection from './ui/SearchSection'
import SearchBar from '../SearchBar'
import { Suspense } from 'react'

const AppHeader = () => {
    const path = usePathname()
    const params = useSearchParams()
    const q = params.get("q")
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const [user] = useAuthState(auth)
    if (path === '/uploads/shot') return null
    return (
        <header className="flex flex-col items-center justify-center w-full gap-8 px-4 py-8 md:px-12 h-fit">
            <nav className="relative flex items-center justify-center w-full h-fit">
                <Suspense fallback={<BiLoaderAlt className='animate-spin' />}>
                    { user && 
                        <Button className='!absolute left-0' size='large' type='primary' href='/uploads/shot' icon={<BiSolidMagicWand size={17} className='inline mb-0.5' />}>
                        { isTabletOrMobile ? '' : 'Поделиться работой'}</Button> 
                    }
                </Suspense>
                <Link href='/'><Image src='/DMXDEY.svg' width={isTabletOrMobile ? 120 : 200} height={isTabletOrMobile ? 40 : 64} alt='v2-logo' /></Link>
                <div className="absolute right-0">
                    <UserStatus />
                </div>
            </nav>
            {
                path === '/search'
                ? <SearchBar q={q} />
                : <SearchSection />
            }
        </header>
    )
}

export default AppHeader