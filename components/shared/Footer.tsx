'use client'

import { app, auth } from "@/utils/app"
import { Button } from "antd"
import { getRemoteConfig, fetchAndActivate, getString } from "firebase/remote-config"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { BiLogoBehance, BiLogoDribbble, BiLogoFigma, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi"

const Footer = () => {
    const [user] = useAuthState(auth)
    const [tag, setTag] = useState<string>('')
    useEffect(() => {
        const remoteConfig = getRemoteConfig(app);
        remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
        fetchAndActivate(remoteConfig)
        .then(() => {
            const bum_string = getString(remoteConfig, 'bum_version')
            setTag(bum_string)
        })
        .catch((err) => {
        });
    },[])
    return (
        <footer className="flex flex-col w-full gap-6 p-4 mt-32 md:p-12 h-fit bg-neutral-950 rounded-xl">
            <div className="flex flex-col w-full max-w-5xl gap-4 mx-auto sm:flex-row h-fit">
                <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-2 border rounded-lg border-neutral-800 sm:w-fit bg-neutral-900">
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Image src='/bum-full.svg' width={200} height={100} alt="bum-logo" />
                        <sup className="text-neutral-400">{tag}</sup>
                    </div>
                    <div className="flex items-center justify-center w-full gap-2 h-fit">
                        <Button className="!px-3" size="large"><BiLogoFigma size={17} /></Button>
                        <Button className="!px-3" size="large"><BiLogoBehance size={17} /></Button>
                        <Button className="!px-3" size="large"><BiLogoTwitter size={17} /></Button>
                        <Button className="!px-3" size="large"><BiLogoLinkedin size={17} /></Button>
                        <Button className="!px-3" size="large"><BiLogoDribbble size={17} /></Button>
                    </div>
                </div>
                <div className="flex items-start w-full h-full gap-4 py-1 md:w-3/4">
                    <div className="flex flex-col items-start justify-center gap-3 w-fit h-fit">
                        <span className="font-medium text-neutral-200">Навигация</span>
                        <Link className="text-sm inl text-neutral-400 hover:text-neutral-200" 
                        href='/shots'>Вдохновение</Link>
                        <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                        href='/membership'>Подписка</Link>
                        {
                            user &&
                            <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                            href='/uploads/shot'>Поделиться работой</Link>
                        }
                    </div>
                    <div className="flex flex-col items-start justify-center gap-3 w-fit h-fit">
                        <span className="font-medium text-neutral-200">Продукты</span>
                        <Link className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200" 
                        href='/redirect/app/darkmaterial.space'>
                            <Image src='/DM.svg' width={20} height={20} alt='dm-logo' />
                            DarkMaterial
                        </Link>
                        <Link className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200" 
                        href='/redirect/app/notes.darkmaterial.space'>
                            <Image src='/Notes.svg' width={20} height={20} alt='dm-logo' />
                            Заметки
                        </Link>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-3 w-fit h-fit">
                        <span className="font-medium text-neutral-200">Подписка</span>
                        <Link className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200" 
                        href='/redirect/app/darkmaterial.space'>
                            <Image src='/dm+.svg' width={20} height={20} alt='dm-logo' />
                            DM+
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between w-full max-w-5xl mx-auto h-fit">
                <div className="flex flex-col items-start gap-4 md:items-center md:flex-row w-fit">
                    <span className='text-sm text-neutral-400'>© 2023 bum</span>
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/terms'>Условия пользования</Link>
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/policy'>Политика конфиденциальности</Link>
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/cookies'>Использование Cookies</Link>
                </div>
                <div className="flex flex-col items-start gap-4 md:items-center md:flex-row w-fit">

                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/search' >Поиск</Link>
                    <Link className="text-sm text-neutral-400 hover:text-neutral-200" 
                    href='/tags'>Тэги</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer