'use client'
import { useDebounceEffect } from 'ahooks'
import { Input } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

type Props = {
    q: string
}
const SearchBar = ({ q }: Props) => {
    const [query, setQuery] = useState<string>(q || '')
    const router = useRouter()
    useDebounceEffect(() => {
        if (query !== '') {
            const url = `/search/${query}`
            router.push(url)
        }
    }, [query, setQuery], { wait: 1000 })
    return (
        <div className="flex items-center w-full max-w-lg px-2.5 py-0.5 border rounded-xl border-neutral-700">
            <BiSearch size={17} className='text-neutral-300' />
            <Input size='large' value={query} bordered={false} onChange={e => setQuery(e.target.value)} placeholder='Поиск' />
        </div>
    )
}

export default SearchBar