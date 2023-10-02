'use client'
import { Segmented, Select } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import React, { useLayoutEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { sortTabs, withCustomSortTab } from './const'
import { useAppSelector } from '@/components/entities/store/store'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { detectCategoryTab, detectSortTab, replaceCategoryTabTo, replaceSortTabTo } from './helpers'

type Props = {
    integrationMode?: boolean
    noCategory?: boolean
}
const CategoryAndOrder = ({ integrationMode=false, noCategory=true }: Props) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const pathname = usePathname()
    const excludeIf = (val: string, notSupported: boolean=false) => {
        if ((!user || !isSub || notSupported) && val === '/recommendations') return false
        if ((!user || notSupported) && val === '/following') return false
        if (!user && val === '/following') return false
        return true
    }
    const detectedSortTab = detectSortTab(pathname) || '/popular'
    const detectedCategoryTab = detectCategoryTab(pathname, detectedSortTab)
    const options = sortTabs(integrationMode).filter(opt => pathname.includes('/shots') ? excludeIf(opt.value, false) : excludeIf(opt.value, true))
    const isShotsLayout = pathname.startsWith('/shots')
    const [orderTab, setOrderTab] = useState<string>(detectedSortTab)
    const [categoryTab, setCategoryTab] = useState<string>(detectedCategoryTab ? detectedCategoryTab : withCustomSortTab(orderTab)[0].value)
    const [debouncedOrderTab, setDebouncedOrderTab] = useState<string>('')
    const router = useRouter()
    useLayoutEffect(() => {
        if (isShotsLayout) {
            const newCategoryTag = replaceCategoryTabTo(categoryTab, debouncedOrderTab ? debouncedOrderTab : detectedSortTab, orderTab)
            setDebouncedOrderTab(orderTab)
            setCategoryTab(newCategoryTag)
        } else {
            const newOrderTab = replaceSortTabTo(pathname, orderTab)
            router.push(newOrderTab)
        }
    },[detectedSortTab, orderTab])
    useLayoutEffect(() => {
        if (isShotsLayout) {

            if (categoryTab !== orderTab &&  (orderTab === '/recommendations' || orderTab === '/following')) {
                const url = `/shots${orderTab}`
            router.push(url)
            } else {
                const url = `/shots${categoryTab}`
                router.push(url)
            }
        }
    },[isShotsLayout, detectedCategoryTab, categoryTab])
    return (
        <div className="relative flex flex-row items-center justify-center w-full gap-2 shrink-0 h-fit">
            <div className={`flex items-center justify-center ${integrationMode ? 'w-fit' : 'w-full'} gap-2 shrink-0 h-fit`}>
                {integrationMode && <span className='text-sm text-neutral-400'>Сортировка: </span>}
                <Segmented size='large' default defaultValue='/popular' options={options} value={orderTab} onChange={e => setOrderTab(e.toString())} />
            </div>
            {
                (noCategory === false || isShotsLayout) &&
                <div className={isTabletOrMobile ? 'w-full flex justify-end' : 'flex items-center justify-center w-full max-w-4xl h-fit'}>
                    {
                        isTabletOrMobile
                        ? <Select className='!w-32' size='large' value={categoryTab} onSelect={e => setCategoryTab(e)}
                        options={withCustomSortTab(orderTab)} defaultValue={detectedCategoryTab} />
                        : <Segmented size='large' className='!shrink-0' value={categoryTab} onChange={e => setCategoryTab(e.toString())}
                        default defaultValue='/popular' options={withCustomSortTab(orderTab)} />
                    }
                </div>
            }
        </div>
    )
}

export default CategoryAndOrder