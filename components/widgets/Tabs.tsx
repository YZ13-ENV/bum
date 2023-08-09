'use client'
import { auth } from '@/utils/app'
import { Segmented, Select, SelectProps } from 'antd'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
const Tabs = () => {
    const [user] = useAuthState(auth)
    const orders: SelectProps['options'] = [
        {
            value: 'popular',
            label: 'Популярные'
        },
        {
            disabled: user ? false : true,
            value: 'following',
            label: 'Подписки'
        },
        {
            value: 'new',
            label: 'Новые'
        }
    ]
    // Категории будут определяться по тэгам, т.е. будет пул тэгов, каждая категория будет содержать часть тэгов из пула
    // Условно говоря в категорию типография не сможет попасть тэг mobile, или calendar, как-то так
    // Ордер по популярным будет определяться по просмотрам, а не по лайкам
    // Фильтры будут работать во всех категориях, например, чтобы можно было в определенной категории отфильтровать под один тэг
    // И наконец фильтрация по дате создания, 4-5 вариантов -> [За всё время, за неделю, за месяц, за сегодня]
    return (
        <div className='flex items-center justify-between w-full gap-4 px-4 py-3 md:gap-12 md:px-12 h-14'>
            <Select size='large' options={orders} value='Популярные' />
            <div className="max-w-4xl overflow-x-auto w-fit">
                <Segmented  size='large' options={["Обзор", "Анимации", "Брендинг", "Иллюстрации", "Веб-дизайн", "Мобильный", "Дизайн продукта", "Печать", "Типография"]} />
            </div>
            <Select size='large' value='Фильтры' />
        </div>
    )
}

export default Tabs