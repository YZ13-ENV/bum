'use client'
import { auth } from '@/utils/app'
import { Segmented } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
    prefix: string
}
const Tabs = ({ prefix }: Props) => {
    const pathname = usePathname()
    const params = useSearchParams()
    const [user] = useAuthState(auth)
    const options = [
        {
            label: 'Популярные',
            value: '/popular'
        },
        {
            disabled: user && pathname.includes('/shots') ? false : true,
            value: '/following',
            label: 'Подписки'
        },
        {
            label: 'Новые',
            value: '/new'
        },
    ].filter(opt => pathname.includes('/shots') ? opt : opt.value !== '/following')
    const [tab, setTab] = useState<SegmentedValue>(options[0].value)
    const router = useRouter()
    const [debouncedUrl, setDebouncedUrl] = useState<string>(`${prefix}/${tab}?${params.toString()}`)
    useLayoutEffect(() => {
        const paramString = params.toString()
        const url = `${prefix}/${tab}?${paramString}`
        if (url !== debouncedUrl) {
            setDebouncedUrl(url)
            router.push(url)
        }
    }, [tab])
    return (
        <div className='flex items-center justify-center w-full gap-4 py-4 shrink-0 md:gap-12 h-fit'>
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