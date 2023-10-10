'use client'
import { Segmented, Select } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { sortTabs, withCustomSortTab } from './const'
import { useAppSelector } from '@/components/entities/store/store'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { cleanPathname, detectCategoryTab, detectSortTab } from './helpers'
// import { SegmentedValue } from 'antd/es/segmented'

type Props = {
    integrationMode?: boolean
    noCategory?: boolean
}
const CategoryAndOrder = ({ integrationMode=false, noCategory=true }: Props) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const pathname = usePathname()
    // const excludeIf = (val: string, notSupported: boolean=false) => {
    //     if ((!user || !isSub || notSupported) && val === '/recommendations') return false
    //     if ((!user || notSupported) && val === '/following') return false
    //     if (!user && val === '/following') return false
    //     return true
    // }
    const detectedSortTab = detectSortTab(pathname)
    const detectedCategoryTab = detectCategoryTab(pathname, detectedSortTab)
    const options = sortTabs(integrationMode) // .filter(opt => pathname.includes('/shots') ? excludeIf(opt.value, false) : excludeIf(opt.value, true))
    const isShotsLayout = useMemo(() => pathname.startsWith('/shots'), [pathname]) 
    const [orderTab, setOrderTab] = useState<string>(detectedSortTab)
    const [categoryTab, setCategoryTab] = useState<string>(detectedCategoryTab ? detectedCategoryTab : withCustomSortTab(orderTab)[0].value)
    const router = useRouter()
    useLayoutEffect(() => {
        const newSegment = categoryTab === '/' ? orderTab : `${orderTab}${categoryTab}`
        const newPath = cleanPathname(pathname, detectedSortTab, detectedCategoryTab)
        // console.log(detectedSortTab, detectedCategoryTab)
        // console.log(orderTab, categoryTab)
        // console.log(pathname, newPath, newSegment)
        router.push(newPath + newSegment)
    },[isShotsLayout, orderTab, categoryTab])
    return (
        <div className="relative flex flex-row items-center justify-between w-full gap-2 px-4 shrink-0 h-fit">
            <div className={`flex items-center justify-center ${integrationMode ? 'w-fit' : 'w-full'} gap-2 shrink-0 h-fit`}>
                {integrationMode && <span className='hidden text-sm md:inline text-neutral-400'>Сортировка: </span>}
                <Segmented size='large' default defaultValue={detectedSortTab} options={options} value={orderTab} onChange={e => setOrderTab(e.toString())} />
            </div>
            {
                (noCategory === false || isShotsLayout) &&
                <div className={isTabletOrMobile ? 'w-full flex justify-end' : 'flex items-center justify-center mx-auto w-fit h-fit'}>
                    {
                        isTabletOrMobile
                        ? <Select className='!w-32' size='large' value={categoryTab} onSelect={e => setCategoryTab(e)}
                        options={withCustomSortTab(orderTab)} defaultValue={'/'} />
                        : <Segmented size='large' className='!shrink-0' value={categoryTab} onChange={e => setCategoryTab(e.toString())}
                        default defaultValue={'/'} options={withCustomSortTab(orderTab)} />
                    }
                </div>
            }
        </div>
    )
}

export default CategoryAndOrder