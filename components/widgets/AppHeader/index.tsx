'use client'
import UserStatus from '@/components/entities/user'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import LogoSection from './LogoSection'
import SearchBar from '../SearchBar'

const AppHeader = () => {
    const path = usePathname()
    const params = useSearchParams()
    const q = params.get('q')
    const [user] = useAuthState(auth)
    if (path === '/uploads/shot') return null
    return (
        <header className="flex flex-col justify-center w-full max-w-5xl gap-4 p-4 mx-auto md:p-8 shrink-0 h-fit">
            <div className="flex items-center justify-between w-full h-full gap-4">
                <LogoSection />
                <div className="items-center justify-center hidden gap-4 md:flex w-fit h-fit">
                    <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/shots/popular'>Вдохновение</Link>
                    <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/membership'>Подписка</Link>
                    { 
                        user && 
                        <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/uploads/shot'>Поделиться работой</Link>
                    }
                </div>
                <div className="flex items-center gap-4 w-fit">
                    {
                        !path.includes('/search') &&
                        <div className="max-w-xs">
                            <SearchBar q={q || ''} />
                        </div>
                    }
                    <UserStatus />
                </div>
            </div>
            <div className="flex items-center justify-center w-full h-full gap-4 md:hidden">
                <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/shots'>Вдохновение</Link>
                <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/membership'>Подписка</Link>
                { 
                    user && 
                    <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/uploads/shot'>Поделиться работой</Link>
                }
            </div>
        </header>
    )
}

export default AppHeader