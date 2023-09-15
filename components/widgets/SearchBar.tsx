'use client'
import { useDebounceEffect } from 'ahooks'
import { Input } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

type Props = {
    q: string | null
}
const SearchBar = ({ q }: Props) => {
    const [query, setQuery] = useState<string>(q || '')
    const params = useSearchParams()
    const router = useRouter()
    useDebounceEffect(() => {
        const paramString = params.toString()
        if (paramString.includes('q')) {
            const edited = paramString.replace(`q=${params.get('q')}`, `q=${query}`)
            router.push(`?${edited}`)
        } else {
            router.push(`?${paramString}&q=${query}`)
        }
    }, [query, setQuery], { wait: 1000 })
    return (
        <div className="flex items-center w-full max-w-lg px-2.5 py-0.5 border rounded-xl border-neutral-700">
            <BiSearch size={17} />
            <Input size='large' value={query} bordered={false} onChange={e => setQuery(e.target.value)} placeholder='Поиск' />
        </div>
    )
}

export default SearchBar