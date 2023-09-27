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
import SubLabel from '@/components/shared/SubLabel'
import { useAppSelector } from '@/components/entities/store/store'

const AppHeader = () => {
    const path = usePathname()
    const params = useSearchParams()
    const q = params.get("q")
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const [user] = useAuthState(auth)
    if (path === '/uploads/shot') return null
    return (
        <header className="flex flex-col items-center justify-center w-full gap-8 px-4 py-8 shrink-0 md:px-12 h-fit">
            <div className="relative flex items-center justify-between w-full shrink-0 h-fit">
                <nav className="flex flex-row items-center gap-4 w-fit h-fit">
                    <Link href='/'><Image src={'/bum-full.svg'} width={120} height={isTabletOrMobile ? 40 : 64} alt='v2-logo' /></Link>
                    <div className="flex flex-row items-center gap-3 w-fit h-fit">
                        <Link className='text-sm md:inline hidden font-medium mt-0.5 text-neutral-300 hover:text-neutral-100' href='/'>Вдохновение</Link>
                        {
                            !isSub &&
                            <Link className='inline-flex items-center gap-2' href='/membership'>
                                <SubLabel/> <span className='text-sm font-medium mt-0.5 hover:text-neutral-100 text-neutral-300'>Подписка</span>
                            </Link>
                        }
                    </div>
                </nav>
                <div className="flex flex-row items-center gap-4 w-fit h-fit">
                    <Suspense fallback={<BiLoaderAlt className='animate-spin' />}>
                        { user && 
                            <Button size='large' type='primary' href='/uploads/shot' icon={<BiSolidMagicWand size={17} className='inline mb-0.5' />}>
                            { isTabletOrMobile ? '' : 'Поделиться работой'}</Button> 
                        }
                    </Suspense>
                    <UserStatus />
                </div>
            </div>
            {
                path === '/search'
                ? <SearchBar q={q} />
                : <SearchSection />
            }
        </header>
    )
}

export default AppHeader