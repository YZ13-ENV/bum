import { setSearchOpen } from '@/components/entities/search/store'
import ShotCard from '@/components/entities/shot'
import { useAppDispatch } from '@/components/entities/store/store'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import { auth } from '@/utils/app'
import { useDebounceEffect } from 'ahooks'
import { Button } from 'antd'
import Link from 'next/link'
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
    q: string
    setQ: Dispatch<SetStateAction<string>>
}
const SearchResults = ({ q, setQ }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [res, setRes] = useState<DocShotData[]>([])
    const [user] = useAuthState(auth)
    const fetchResults = async() => {
        setLoading(true)
        const fetchUrl = `${getHost()}/search/query/${q.toLowerCase()}/popular${user ? `&userId=${user.uid}` : ''}`
        const res = await fetch(fetchUrl)
        if (res.ok) {
            const shots: DocShotData[] = await res.json()
            setRes(shots)
            setLoading(false)
        } else setLoading(false)
    }
    const dispatch = useAppDispatch()
    useLayoutEffect(() => {setLoading(true)},[q, setQ])
    useDebounceEffect(() => {fetchResults()},[q, setQ], { wait: 2000 })
    return (
        <div className="flex flex-col w-full h-full gap-2 p-2 overflow-y-auto">
            <div className="flex items-center justify-between w-full h-fit">
                <span className='text-xs text-neutral-400'>Найдено работ: {res.length}</span>
                <Link onClick={() => { dispatch(setSearchOpen(false)); setQ('') }} 
                href={`/search/${q}/popular`} className='text-xs text-neutral-400'>Открыть в виде страницы</Link>
            </div>
            {
                loading ?
                <div className="grid w-full h-[97%] gap-4 min-h-fit search_grid">
                    <div className='w-full h-full aspect-[4/3] rounded-xl bg-neutral-800 animate-pulse'/>
                    <div className='w-full h-full aspect-[4/3] rounded-xl bg-neutral-800 animate-pulse'/>
                    <div className='w-full h-full aspect-[4/3] rounded-xl bg-neutral-800 animate-pulse'/>
                    <div className='w-full h-full aspect-[4/3] rounded-xl bg-neutral-800 animate-pulse'/>
                    <div className='w-full h-full aspect-[4/3] rounded-xl bg-neutral-800 animate-pulse'/>
                    <div className='w-full h-full aspect-[4/3] rounded-xl bg-neutral-800 animate-pulse'/>
                    <div className='w-full h-full aspect-[4/3] rounded-xl bg-neutral-800 animate-pulse'/>
                    <div className='w-full h-full aspect-[4/3] rounded-xl bg-neutral-800 animate-pulse'/>

                </div>
                : res.length === 0 ?
                <>
                    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                        <div className="flex flex-col items-center justify-center w-fit h-fit">
                            <span className='font-semibold text-neutral-200'>Не найдено</span>
                            <span className='text-xs text-neutral-400'>Ничего с название {q}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 w-fit h-fit">
                            <Button onClick={() => setQ('')}>Очистить поиск</Button>
                            <Button href='/uploads/shot' type='primary'>Создать проект</Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full h-fit">
                        <Link href={'/'} className='text-xs text-neutral-400'>Открыть страницу поиска</Link>
                    </div>
                </>
                :
                <div className="grid w-full gap-4 search_grid">
                    {
                        res.map((shot) => <div key={shot.doc_id + 'searched'} className='aspect-[4/3]'><ShotCard shot={shot} /></div>)
                    }
                </div>
            }
        </div>
    )
}

export default SearchResults