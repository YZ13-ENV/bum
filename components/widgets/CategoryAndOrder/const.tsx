import { Tooltip } from "antd"
import { BsStars } from "react-icons/bs"
import { HiSortDescending } from "react-icons/hi"
import { MdFiberNew } from "react-icons/md"
import { RiUserStarLine } from "react-icons/ri"

export const withCustomSortTab = (sortTag: string) => [
    {
        label: 'Обзор',
        value: sortTag
    },
    {
        label: 'Анимация',
        value: `${sortTag}/animation`
    },
    {
        label: 'Иллюстрация',
        value: `${sortTag}/illustration`
    },
    {
        label: 'Типография',
        value: `${sortTag}/typography`
    },
    {
        label: 'Дизайн продукта',
        value: `${sortTag}/product_design`
    },
    {
        label: 'Веб дизайн',
        value: `${sortTag}/web`
    },
    {
        label: 'Мобильный дизайн',
        value: `${sortTag}/mobile`
    },
]
export const sortTabs = (integrationMode?: boolean) => [
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
        icon: <Tooltip title='Подписки'><RiUserStarLine className='inline-block mb-1' size={17} /></Tooltip>,
        value: '/following',
        label: 'Подписки'
    },
    {
        icon: <Tooltip title='Новые'><MdFiberNew className='inline-block mb-1' size={17} /></Tooltip>,
        label: 'Новые',
        value: '/new'
    },
].map(opt => integrationMode ? { icon: opt.icon, value: opt.value } : opt)