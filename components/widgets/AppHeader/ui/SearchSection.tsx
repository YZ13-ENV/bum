'use client'
import { setSearchOpen } from '@/components/entities/search/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { useClickAway } from 'ahooks'
import { Button, Input } from 'antd'
import Link from 'next/link'
import React, { ElementRef, useRef } from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchSection = () => {
    const isOpen = useAppSelector(state => state.search.isOpen)
    const dispatch = useAppDispatch()
    const ref = useRef<ElementRef<'div'>>(null)
    useClickAway(() => {
        dispatch(setSearchOpen(false))
    }, ref);
    if (isOpen) {
        return (
            <div className="relative w-full h-full max-w-full md:max-w-md">
                <div ref={ref} 
                className="absolute left-0 z-20 flex flex-col w-full border top-2 h-96 rounded-xl bg-neutral-900 border-neutral-700">

                    <div className="flex items-center w-full gap-2 pl-3 pr-1 border-b h-fit border-neutral-700">
                        <BiSearch size={17} className='inline text-neutral-500'  />
                        <Input size='large' placeholder='Поиск' bordered={false} className='!px-0 !rounded-none' />
                        <Button type='text'>Отмена</Button>
                    </div>
                    <div className="flex flex-col w-full h-full gap-1 p-2">
                        <div className="flex items-center w-full h-fit">
                            <span className='text-xs text-neutral-400'>Найдено работ: 0</span>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full h-full gap-3 border rounded-xl border-neutral-800">
                            <div className="flex flex-col items-center justify-center w-fit h-fit">
                                <span className='font-semibold text-neutral-200'>Не найдено</span>
                                <span className='text-xs text-neutral-400'>Мы не нашли работа с таким названием</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 w-fit h-fit">
                                <Button>Очистить поиск</Button>
                                <Button type='primary'>Создать проект</Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-end w-full h-fit">
                            <Link href={'/'} className='text-xs text-neutral-400'>Открыть страницу поиска</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div onClick={() => dispatch(setSearchOpen(true))} className="w-full max-w-full md:max-w-xs">
            <div className="flex items-center w-full gap-1 px-3 border rounded-lg h-9 border-neutral-700 bg-neutral-900">
                <BiSearch size={17} className='inline text-neutral-500'  />
                <span className='text-sm text-neutral-500'>Поиск</span>
            </div>
        </div>
    )
}

export default SearchSection