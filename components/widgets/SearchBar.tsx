'use client'
import { useDebounceEffect } from 'ahooks'
import { Input } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

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
        <div className="w-full max-w-lg">
            <Input size='large' value={query} onChange={e => setQuery(e.target.value)} placeholder='Поиск' />
        </div>
    )
}

export default SearchBar