'use client'
import UserSection from './ui/UserSection'
import LogoSection from './ui/LogoSection'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector } from '@/components/entities/store/store'
import Image from 'next/image'
import Link from 'next/link'
import UserStatus from '@/components/entities/user'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { BiShare } from 'react-icons/bi'
import { Button } from 'antd'
import SearchSection from './ui/SearchSection'

const AppHeader = () => {
    const path = usePathname()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const isOpen = useAppSelector(state => state.search.isOpen)
    const isSubscriber = useAppSelector(state => state.user.isSubscriber)
    const [user] = useAuthState(auth)
    if (path === '/uploads/shot') return null
    // if (isSubscriber) {
    return (
        <header className="flex flex-col items-center justify-center w-full gap-4 px-4 py-4 md:px-12 h-fit">
            <nav className="relative flex items-center justify-center w-full h-fit">
                { user && 
                    <Button className='!absolute left-0' size='large' type='primary' href='/uploads/shot' icon={<BiShare size={17} className='inline mb-0.5' />}>
                    { isTabletOrMobile ? '' : 'Поделиться работой'}</Button> 
                }
                <Link href='/'><Image src='/LogoWHandFont.svg' width={128} height={64} alt='v2-logo' /></Link>
                <div className="absolute right-0">
                    <UserStatus />
                </div>
            </nav>
            <SearchSection />
        </header>
    )
    // }
    // return (
    //     <header className="flex items-center justify-between w-full h-16 gap-2 px-4 lg:px-12 md:px-6 shrink-0">
    //         {
    //             isTabletOrMobile && isOpen ? null
    //             : <LogoSection />
    //         }
    //         <UserSection />
    //     </header>
    // )
}

export default AppHeader