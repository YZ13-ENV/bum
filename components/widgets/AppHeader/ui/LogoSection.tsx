import { Dropdown, Button, MenuProps, Popover } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiMenu } from 'react-icons/bi'

const LogoSection = () => {
    const content = (
        <div className="h-96 w-96"></div>
    )
    return (
        <div className='flex items-center gap-4 w-fit h-fit shrink-0'>
            {/* <Popover content={content} trigger={['click']}><Button size='large' className='!px-2'><BiMenu size={23} /></Button></Popover> */}
            <Link href='/' className="flex items-center gap-2 shrink-0 w-fit h-fit">
                <Image src='/Dey.svg' className='shrink-0' width={32} height={32} alt="app-logo" />
                <span className='hidden text-2xl font-bold md:inline text-neutral-200'>Dey</span>
            </Link>
        </div>
    )
}

export default LogoSection