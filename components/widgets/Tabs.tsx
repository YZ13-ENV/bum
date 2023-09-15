'use client'
import { auth } from '@/utils/app'
import { Button, Segmented, Select, SelectProps } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiFilter } from 'react-icons/bi'

const Tabs = () => {
    const pathname = usePathname()
    const params = useSearchParams()
    const [order, setOrder] = useState<string>('popular')
    const [user] = useAuthState(auth)
    const orders: SelectProps['options'] = [
        {
            value: 'popular',
            label: 'Популярные'
        },
        {
            disabled: user && pathname === '/' ? false : true,
            value: 'following',
            label: 'Подписки'
        },
        {
            value: 'new',
            label: 'Новые'
        }
    ]
    const options = [
        {
            label: 'Популярные',
            value: 'popular'
        },
        {
            label: 'Новые',
            value: 'new'
        },
    ]
    const [tab, setTab] = useState<SegmentedValue>(options[0].value)
    const router = useRouter()
    useLayoutEffect(() => {
        const paramString = params.toString()
        if (paramString.includes('order')) {
            const edited = paramString.replace(`order=${params.get('order')}`, `order=${tab}`)
            router.push(`?${edited}`)
        } else {
            router.push(`?order=${tab}&${paramString}`)
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