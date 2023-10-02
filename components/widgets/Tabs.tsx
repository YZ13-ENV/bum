'use client'
import { auth } from '@/utils/app'
import { Segmented, Tooltip } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
import { usePathname, useRouter, useSearchParams, useSelectedLayoutSegment } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppSelector } from '../entities/store/store'
import { MdFiberNew } from 'react-icons/md'
import { BsStars } from 'react-icons/bs'
import { HiSortDescending } from 'react-icons/hi'
import { RiUserStarLine } from 'react-icons/ri'

type Props = {
    prefix: string
    integrationMode?: boolean
}
const Tabs = ({ prefix, integrationMode=false }: Props) => {
    const pathname = usePathname()
    const params = useSearchParams()
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
    const segment = useSelectedLayoutSegment()
    const [tab, setTab] = useState<SegmentedValue>(segment ? `/${segment}` : options[0].value)
    const router = useRouter()
    const [debouncedUrl, setDebouncedUrl] = useState<string>(`${prefix}/${tab}?${params.toString()}`)
    useLayoutEffect(() => {
        const paramString = params.toString()
        const url = `${prefix}/${tab}?${paramString}`
        if (url !== debouncedUrl || !(segment === ('popular' || 'following' || 'new'))) {
            setDebouncedUrl(url)
            router.push(url)
        }
    }, [tab])
    return (
        <div className={`flex items-center justify-center ${integrationMode ? 'w-fit' : 'w-full'} gap-2 shrink-0 h-fit`}>
            {integrationMode && <span className='text-sm text-neutral-400'>Сортировка: </span>}
            <Segmented size='large' default defaultValue='popular' options={options} value={tab} onChange={e => setTab(e)} />
            {/* <Select size='large' className='!w-32' options={orders} value={order} onChange={e => setOrder(e.toString())} /> */}
            {/* <div className="hidden max-w-4xl overflow-x-auto w-fit"> */}
                {/* <Segmented  size='large' options={["Обзор", "Анимации", "Брендинг", "Иллюстрации", "Веб-дизайн", "Мобильный", "Дизайн продукта", "Печать", "Типография"]} /> */}
            {/* </div> */}
            {/* <Button size='large' disabled icon={<BiFilter size={17} className='inline mb-0.5' />}>Фильтры</Button> */}
        </div>
    )
}

export default Tabs