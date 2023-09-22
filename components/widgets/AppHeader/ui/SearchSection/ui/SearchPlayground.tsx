import { setSearchOpen } from '@/components/entities/search/store'
import { useAppDispatch } from '@/components/entities/store/store'
import { Input, Button } from 'antd'
import { useState } from 'react'
import { BiPlus, BiSearch, BiX } from 'react-icons/bi'
import SearchResults from './SearchResults'
import { useRouter } from 'next/navigation'
import LastSearchQueries from './LastSearchQueries'

const SearchPlayground = () => {
    const dispatch = useAppDispatch()
    const [q, setQ] = useState<string>('')
    const router = useRouter()
    return (
        <div onClick={() => dispatch(setSearchOpen(false))}
        className="fixed top-0 left-0 z-30 w-full h-screen max-w-full p-2 pb-4 bg-black md:left-2 md:top-2 bg-opacity-40">
            <div onClick={e => e.stopPropagation()}
            className={`flex flex-col w-full mx-auto border gap-2 md:max-w-xl ${q.length === 0 ? 'h-[60vh]' : 'h-full'} p-3 rounded-xl bg-neutral-900 border-neutral-700`}>
                <div className="flex items-center w-full gap-2 pl-3 pr-1 bg-black border h-fit rounded-xl border-neutral-800">
                    <BiSearch size={17} className='inline text-neutral-500'  />
                    <Input size='large' value={q} onChange={e => setQ(e.target.value)}
                    placeholder='Поиск' bordered={false} className='!px-0 !rounded-none' />
                    { q.length >= 3 && <Button onClick={() => setQ('')} type='text'><BiX size={15} /></Button> }
                    <Button onClick={() => {dispatch(setSearchOpen(false)); setQ('')}} type='text'>Отмена</Button>
                </div>

                {
                    q.length === 0
                    ? 
                    <>
                        <div className="flex flex-col w-full gap-2 h-fit">
                            <span className='text-xs text-neutral-400'>Быстрые действия</span>
                            <div onClick={() => router.push('/uploads/shot')} className="flex items-center w-full h-10 gap-1 px-3 bg-black border rounded-xl border-neutral-800">
                                <BiPlus className='mb-0.5 text-neutral-300' size={19} />
                                <span className='text-sm text-neutral-300'>Поделиться работой</span>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2 h-fit">
                            <span className='text-xs text-neutral-400'>Последние запросы</span>
                            <LastSearchQueries q={q} setQ={setQ} />
                        </div>
                        <div className='flex items-center justify-center w-full h-full'>
                            <span className='text-xs text-center text-neutral-300'>Введите что хотите найти</span>
                        </div>
                    </>
                    :
                    <SearchResults q={q} setQ={setQ} />
                }
            </div>
        </div>
    )
}

export default SearchPlayground