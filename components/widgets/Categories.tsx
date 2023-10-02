'use client'
import { Segmented, Select } from 'antd'
import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Categories = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const options = [
        {
            label: 'Обзор',
            value: '/shots/popular'
        },
        {
            label: 'Анимация',
            value: '/shots/animation/popular'
        },
        {
            label: 'Иллюстрация',
            value: '/shots/illustration/popular'
        },
        {
            label: 'Типография',
            value: '/shots/typography/popular'
        },
        {
            label: 'Дизайн продукта',
            value: '/shots/product_design/popular'
        },
        {
            label: 'Веб дизайн',
            value: '/shots/web/popular'
        },
        {
            label: 'Мобильный дизайн',
            value: '/shots/mobile/popular'
        },
    ]
    return (
        <div className={isTabletOrMobile ? 'w-full flex justify-end' : 'flex items-center justify-center w-full max-w-4xl h-fit'}>
            {
                isTabletOrMobile
                ? <Select className='w-24' size='large' options={options} defaultValue='/shots/popular' />
                : <Segmented size='large' className='!shrink-0' default defaultValue='/shots/popular' options={options} />
            }
        </div>

    )
}

export default Categories