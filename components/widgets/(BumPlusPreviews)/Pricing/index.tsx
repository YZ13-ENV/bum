'use client'
import React, { useState } from 'react'
import { Switch } from 'antd'
import PricingPool from './ui/PricingPool'
import Image from 'next/image'
import { BiCheck, BiX } from 'react-icons/bi'
import AdvantageRow from './ui/AdvantageRow'

const Pricing = () => {
    const [forYear, setForYear] = useState<boolean>(false)
    return (
        <div className='flex flex-col items-center justify-center w-full gap-12 py-12 h-fit'>
            <div className="flex flex-col gap-8 mx-auto w-fit h-fit">
                <div className="flex items-center justify-center w-full">
                    <h1 className='text-6xl font-bold text-center text-neutral-200'>
                        Доступные цены для новых возможностей
                    </h1>
                </div>
                <div className="flex items-center justify-center w-full gap-2">
                    <span className={`text-sm ${!forYear ? 'text-neutral-200' : 'text-neutral-400'} `}>На месяц</span>
                    <Switch onChange={e => setForYear(e)} checked={forYear} />
                    <span className={`text-sm ${forYear ? 'text-neutral-200' : 'text-neutral-400'} `}>На год <sup className='font-medium text-transparent bg-clip-text bg-gradient-to-tl from-neutral-400 to-white'>Выгодно</sup></span>
                </div>
                <PricingPool forYear={forYear} />
                <div className="flex items-center justify-center w-full mt-24">
                    <h1 className='text-4xl font-bold text-center text-neutral-300'>
                        Все преимущества
                    </h1>
                </div>
                <div className="flex flex-col w-full max-w-lg gap-3 p-3 mx-auto border h-fit rounded-2xl border-neutral-700">
                    <table>
                        <thead>
                            <tr className='w-full'>
                                <th className='w-full h-full'>
                                    <div className="flex items-center w-full h-8 gap-2 px-2 py-1 border-b border-neutral-800">
                                        <Image src='/bum.svg' width={18} height={18} className='brightness-75' alt='bum-logo' />
                                        <span className='font-medium text-neutral-400'>bum</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center h-8 gap-2 px-2 py-1 mx-2 text-sm font-normal border-b w-fit border-neutral-800">
                                    Стандарт
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center h-8 gap-2 px-2 py-1 text-sm font-normal border-b w-fit border-neutral-800">
                                    DM+
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <AdvantageRow title={<span className='text-neutral-300'>Загрузка видео в главный блок</span>} 
                            noSub={<BiCheck size={19} className='mx-auto' />} withSub={<BiCheck size={19} className='mx-auto' />} />
                            <AdvantageRow title={<span className='text-neutral-300'>Загрузка видео в медиа блок</span>} 
                            noSub={<BiX size={19} className='mx-auto text-neutral-400' />} withSub={<BiCheck size={19} className='mx-auto' />} />
                            <AdvantageRow title={<span className='text-neutral-300'>Большее кол-во медиа блоков</span>} 
                            noSub={<BiX size={19} className='mx-auto text-neutral-400' />} withSub={<BiCheck size={19} className='mx-auto' />} />
                            <AdvantageRow title={<span className='text-neutral-300'>Ambient подсветка для главного блока</span>} 
                            noSub={<BiX size={19} className='mx-auto text-neutral-400' />} withSub={<BiCheck size={19} className='mx-auto' />} />
                            <AdvantageRow title={<span className='text-neutral-300'>Возможность оставлять реакции для комментариев</span>} 
                            noSub={<BiX size={19} className='mx-auto text-neutral-400' />} withSub={<BiCheck size={19} className='mx-auto' />} />
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr className='w-full'>
                                <th className='w-full h-full'>
                                    <div className="flex items-center w-full h-8 gap-2 px-2 py-1 border-b border-neutral-800">
                                        <Image src='/DM.svg' width={18} height={18} className='brightness-75' alt='bum-logo' />
                                        <span className='font-medium text-neutral-400'>Сервисы DarkMaterial</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center h-8 gap-2 px-2 py-1 mx-2 text-sm font-normal border-b w-fit border-neutral-800">
                                    Стандарт
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center h-8 gap-2 px-2 py-1 text-sm font-normal border-b w-fit border-neutral-800">
                                    DM+
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='w-full h-64'>
                            <tr>
                                <th className='w-full h-64'>
                                    <div className='w-full h-full col-span-3 rounded-xl shrink-0 bg-neutral-900 animate-pulse' />
                                </th>
                                <th className='h-64'>
                                    <div className='w-full h-full col-span-3 rounded-xl shrink-0 bg-neutral-900 animate-pulse' />
                                </th>
                                <th className='h-64'>
                                    <div className='w-full h-full col-span-3 rounded-xl shrink-0 bg-neutral-900 animate-pulse' />
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Pricing