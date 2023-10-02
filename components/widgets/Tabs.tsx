'use client'
import { auth } from '@/utils/app'
import { Segmented, Tooltip } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
import { usePathname, useRouter, useSearchParams, useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppSelector } from '../entities/store/store'
import { MdFiberNew } from 'react-icons/md'
import { BsStars } from 'react-icons/bs'
import { HiSortDescending } from 'react-icons/hi'
import { RiUserStarLine } from 'react-icons/ri'

type Props = {
    prefix: string
    category?: string
    integrationMode?: boolean
}
const Tabs = ({ prefix, integrationMode=false, category }: Props) => {
    const pathname = usePathname()
    // const params = useSearchParams()
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const excludeIf = (val: string, notSupported: boolean=false) => {
        if ((!user || !isSub || notSupported) && val === '/recommendations') return false
        if ((!user || notSupported) && val === '/following') return false
        if (!user && val === '/following') return false
        return true
    }
    const options = [
        {
            icon: <Tooltip title='Рекомендации'><BsStars className='inline-block mb-1' size={17} /></Tooltip>,
            label: 'Рекомендации',
            value: '/recommendations'
        },
        {
            icon: <Tooltip title='Популярные'><HiSortDescending className='inline-block mb-1' size={17} /></Tooltip>,
            label: 'Популярные',
            value: '/popular'
        },
        {
            disabled: user && pathname.includes('/shots') ? false : true,
            icon: <Tooltip title='Подписки'><RiUserStarLine className='inline-block mb-1' size={17} /></Tooltip>,
            value: '/following',
            label: 'Подписки'
        },
        {
            icon: <Tooltip title='Новые'><MdFiberNew className='inline-block mb-1' size={17} /></Tooltip>,
            label: 'Новые',
            value: '/new'
        },
    ]
    .map(opt => integrationMode ? { icon: opt.icon, value: opt.value } : opt)
    .filter(opt => pathname.includes('/shots') ? excludeIf(opt.value, false) : excludeIf(opt.value, true))
    const detectCategoryTab = (segment: string) => {
        if (segment.includes(detectedSortTab)) return detectedSortTab
        if (segment.includes(`${detectedSortTab}/animation`)) return `${detectedSortTab}/animation`
        if (segment.includes(`${detectedSortTab}/illustration`)) return `${detectedSortTab}/illustration`
        if (segment.includes(`${detectedSortTab}/typography`)) return `${detectedSortTab}/typography`
        if (segment.includes(`${detectedSortTab}/product_design`)) return `${detectedSortTab}/product_design`
        if (segment.includes(`${detectedSortTab}/web`)) return `${detectedSortTab}/web`
        if (segment.includes(`${detectedSortTab}/mobile`)) return `${detectedSortTab}/mobile`
        return null
    }
    const tabOpt = ((tab: string) => {
        if (tab.includes('/recommendations')) return true
        if (tab.includes('/popular')) return true
        if (tab.includes('/following')) return true
        if (tab.includes('/new')) return true
        return false
    })
    const segmentHasNewTab = (segment: string, tab: string) => segment.includes(tab)
    const detectTab = (segment: string) => {
        if (segment.includes('/recommendations')) return '/recommendations'
        if (segment.includes('/popular')) return '/popular'
        if (segment.includes('/following')) return '/following'
        if (segment.includes('/new')) return '/new'
        return null
    }
    const replaceTo = (segment: string, toReplace: string) => {
        if (segment.includes('/recommendations')) return segment.replace('/recommendations', toReplace)
        if (segment.includes('/popular')) return segment.replace('/popular', toReplace)
        if (segment.includes('/following')) return segment.replace('/following', toReplace)
        if (segment.includes('/new')) return segment.replace('/new', toReplace)
        return segment
    }
    const detectedSortTab = detectTab(pathname) || '/popular'
    const hasCategory = detectCategoryTab(pathname) !== null
    const [tab, setTab] = useState<SegmentedValue>(detectTab(pathname) ? detectTab(pathname) as string : options[0].value)
    const router = useRouter()
    useLayoutEffect(() => {
            if (tabOpt(pathname)) {
                const accessedTabs = detectedSortTab === '/recommendations' || detectedSortTab === '/following'
                if (hasCategory && accessedTabs && pathname.includes('/shots')) {
                    router.push(`/shots${detectTab(pathname) || '/popular'}`)
                } else {
                    if (!segmentHasNewTab(pathname, tab.toString())) router.push(replaceTo(pathname, tab.toString()))

                }
            }
    }, [tab, pathname])
    return (
        <div className={`flex items-center justify-center ${integrationMode ? 'w-fit' : 'w-full'} gap-2 shrink-0 h-fit`}>
            {integrationMode && <span className='text-sm text-neutral-400'>Сортировка: </span>}
            <Segmented size='large' default defaultValue='popular' options={options} value={tab} onChange={e => setTab(e)} />
        </div>
    )
}

export default Tabs