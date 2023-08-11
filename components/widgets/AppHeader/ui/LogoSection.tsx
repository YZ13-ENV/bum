import { Dropdown, Button, MenuProps } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiMenu } from 'react-icons/bi'

const LogoSection = () => {
    const items: MenuProps['items'] = [
        {
            key: 1,
            label: 'Главная'
        }
    ]
    return (
        <div className='flex items-center gap-2 w-fit h-fit shrink-0'>
            <Dropdown menu={{items}} trigger={['click']}><Button size='large' className='!px-2'><BiMenu size={23} /></Button></Dropdown>
            <Link href='/' className="flex items-center gap-2 shrink-0 w-fit h-fit">
                <Image src='/Dey.svg' className='shrink-0' width={32} height={32} alt="app-logo" />
                <span className='hidden text-2xl font-bold md:inline text-neutral-200'>Dey</span>
            </Link>
        </div>
    )
}

export default LogoSection