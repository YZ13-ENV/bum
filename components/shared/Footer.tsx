'use client'

import { Button } from "antd"
import Image from "next/image"
import Link from "next/link"
import { BiLogoDribbble, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi"

const Footer = () => {
    return (
        <div className="flex flex-col w-full gap-6 p-4 md:p-12 h-fit bg-neutral-950 rounded-xl">
            <div className="flex w-full h-full max-w-5xl mx-auto">
                <div className="flex flex-col w-1/2 h-full gap-4">
                    <Image src='/bum-full.svg' width={120} height={60} alt="bum-logo" />
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Button className="!px-3" size="large"><BiLogoTwitter size={17} /></Button>
                        <Button className="!px-3" size="large"><BiLogoLinkedin size={17} /></Button>
                        <Button className="!px-3" size="large"><BiLogoDribbble size={17} /></Button>
                    </div>
                </div>
                <div className="flex w-1/2 h-full">
                </div>
            </div>
            <div className="flex items-center justify-between w-full h-fit">
                <div className="flex flex-col items-start gap-4 md:items-center md:flex-row w-fit">
                    <span className='text-sm text-neutral-400'>© 2023 bum</span>
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/terms'>Условия пользования</Link>
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/policy'>Политика конфиденциальности</Link>
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/cookie-policy'>Использование Cookie</Link>
                </div>
                <div className="flex flex-col items-start gap-4 md:items-center md:flex-row w-fit">
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/membership'>Подписка</Link>
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/search' >Поиск</Link>
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/tags'>Тэги</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer