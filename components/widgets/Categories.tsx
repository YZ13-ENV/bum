'use client'
import { Segmented, Select } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
import { usePathname, useRouter, useSelectedLayoutSegments } from 'next/navigation'
import React, { useLayoutEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const Categories = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const pathname = usePathname()
    const detectSortTab = (segment: string) => {
        if (segment.includes('/recommendations')) return '/recommendations'
        if (segment.includes('/popular')) return '/popular'
        if (segment.includes('/following')) return '/following'
        if (segment.includes('/new')) return '/new'
        return null
    }
    const detectedSortTab = detectSortTab(pathname) || '/popular'
    const options = [
        {
            label: 'Обзор',
            value: detectedSortTab
        },
        {
            label: 'Анимация',
            value: `${detectedSortTab}/animation`
        },
        {
            label: 'Иллюстрация',
            value: `${detectedSortTab}/illustration`
        },
        {
            label: 'Типография',
            value: `${detectedSortTab}/typography`
        },
        {
            label: 'Дизайн продукта',
            value: `${detectedSortTab}/product_design`
        },
        {
            label: 'Веб дизайн',
            value: `${detectedSortTab}/web`
        },
        {
            label: 'Мобильный дизайн',
            value: `${detectedSortTab}/mobile`
        },
    ]

    const tabOpt = ((tab: string) => {
        if (tab.includes(detectedSortTab)) return true
        if (tab.includes(`${detectedSortTab}/animation`)) return true
        if (tab.includes(`${detectedSortTab}/illustration`)) return true
        if (tab.includes(`${detectedSortTab}/typography`)) return true
        if (tab.includes(`${detectedSortTab}/product_design`)) return true
        if (tab.includes(`${detectedSortTab}/web`)) return true
        if (tab.includes(`${detectedSortTab}/mobile`)) return true
        return false
    })
    const segmentHasNewTab = (segment: string, tab: string) => segment.includes(tab)
    const detectTab = (segment: string) => {
        if (segment.includes(detectedSortTab)) return detectedSortTab
        if (segment.includes(`${detectedSortTab}/animation`)) return `${detectedSortTab}/animation`
        if (segment.includes(`${detectedSortTab}/illustration`)) return `${detectedSortTab}/illustration`
        if (segment.includes(`${detectedSortTab}/typography`)) return `${detectedSortTab}/typography`
        if (segment.includes(`${detectedSortTab}/product_design`)) return `${detectedSortTab}/product_design`
        if (segment.includes(`${detectedSortTab}/web`)) return `${detectedSortTab}/web`
        if (segment.includes(`${detectedSortTab}/mobile`)) return `${detectedSortTab}/mobile`
        return null
    }
    const replaceTo = (segment: string, toReplace: string) => {
        if (segment.includes(detectedSortTab)) return segment.replace(detectedSortTab, toReplace)
        if (segment.includes(`${detectedSortTab}/animation`)) return segment.replace(`${detectedSortTab}/animation`, toReplace)
        if (segment.includes(`${detectedSortTab}/illustration`)) return segment.replace(`${detectedSortTab}/illustration`, toReplace)
        if (segment.includes(`${detectedSortTab}/typography`)) return segment.replace(`${detectedSortTab}/typography`, toReplace)
        if (segment.includes(`${detectedSortTab}/product_design`)) return segment.replace(`${detectedSortTab}/product_design`, toReplace)
        if (segment.includes(`${detectedSortTab}/web`)) return segment.replace(`${detectedSortTab}/web`, toReplace)
        if (segment.includes(`${detectedSortTab}/mobile`)) return segment.replace(`${detectedSortTab}/mobile`, toReplace)
        return segment
    }
    const router = useRouter()
    const [tab, setTab] = useState<SegmentedValue>(detectTab(pathname) ? detectTab(pathname) as string : options[0].value)
    useLayoutEffect(() => {
        if (tabOpt(pathname)) {
            const accessedTabs = detectedSortTab === '/popular' || detectedSortTab === '/new'
            if (!segmentHasNewTab(pathname, tab.toString()) && accessedTabs) {
                const newLink = replaceTo(pathname, tab.toString())
                // console.log(pathname, detectedSortTab, detectTab(pathname))
                console.log(newLink)
                router.push(newLink)
            }
        }
    }, [tab, pathname])
    return (
        <div className={isTabletOrMobile ? 'w-full flex justify-end' : 'flex items-center justify-center w-full max-w-4xl h-fit'}>
            {
                isTabletOrMobile
                ? <Select className='w-24' size='large' options={options} defaultValue={detectedSortTab} />
                : <Segmented size='large' className='!shrink-0' value={tab} onChange={e => setTab(e)}
                default defaultValue='/popular' options={options} />
            }
        </div>

    )
}

export default Categories