'use client'
import Image from 'next/image'
import UserStatus from '@/components/entities/user'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import SearchBar from '../SearchBar'
import SearchSection from './ui/SearchSection'

const AppHeader = () => {
    const path = usePathname()
    const params = useSearchParams()
    const q = params.get('q')
    const [user] = useAuthState(auth)
    if (path === '/uploads/shot') return null
    return (
        <header className="flex flex-col justify-center w-full max-w-5xl gap-4 p-4 mx-auto md:p-8 shrink-0 h-fit">
            <div className="flex items-center justify-between w-full h-full p-2 pr-4">
                <div className='flex items-center gap-2 px-1 w-fit h-fit'>
                    <Image src={'/bum.svg'} width={36} height={36} alt='v2-logo' />
                    <span className='text-2xl font-medium text-neutral-200'>
                        bum
                    </span>
                    <sup className='text-sm text-neutral-400'>{process.env.NODE_ENV === 'development' ? 'Dev' : 'Beta'}</sup>
                </div>
                <div className="items-center justify-center hidden gap-4 md:flex w-fit h-fit">
                    <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/'>Вдохновение</Link>
                    <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/membership'>Подписка</Link>
                    { 
                        user && 
                        <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/uploads/shot'>Поделиться работой</Link>
                    }
                </div>
                <div className="flex items-center gap-4 shrink-0 w-fit">
                    <div className="max-w-xs shrink-0">
                    {
                        path === '/search'
                        ? <SearchBar q={q} />
                        : <SearchSection />
                    }
                    </div>
                    <UserStatus />
                </div>
            </div>
            <div className="flex items-center justify-center w-full h-full gap-4 p-2 md:hidden">
                <Link className='text-sm font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/'>Вдохновение</Link>
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