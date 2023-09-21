import { getHost } from '@/helpers/getHost'
import { auth } from '@/utils/app'
import React, { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type SearchQuery = {
    query: string
    createdAt: number
}
type Props = {
    q: string
    setQ: React.Dispatch<React.SetStateAction<string>>
}
const LastSearchQueries = ({ q, setQ }: Props) => {
    const [queries, setQueries] = useState<SearchQuery[]>([])
    const [user] = useAuthState(auth)
    const getQueries = async() => {
        if (user) {
            try {
                const url = `${getHost()}/search/dey?userId=${user.uid}`
                const res = await fetch(url, { cache: 'no-store' })
                if (res.ok) {
                    const qrs = await res.json() as SearchQuery[]
                    setQueries(qrs)
                } else setQueries([])
            } catch (e) {
                return []
            }
        } else setQueries([])
    }
    useLayoutEffect(() => {
        getQueries()
    },[])
    if (queries.length === 0) return null
    return (
        <div className='flex flex-col w-full max-h-[10rem] overflow-y-auto gap-1 h-fit'>
            {
                queries.map(qr => <span key={qr.createdAt} onClick={() => setQ(qr.query)} 
                className='px-2 py-1 text-sm capitalize bg-black border rounded-lg hover:bg-neutral-800 border-neutral-800 text-neutral-300'>{qr.query}</span>)
            }
        </div>
    )
}

export default LastSearchQueries