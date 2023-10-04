import { getHost } from '@/helpers/getHost'
import { auth } from '@/utils/app'
import { Button } from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiX } from 'react-icons/bi'

type SearchQuery = {
    queryId: string
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
                const url = `${getHost()}/search/history/dey?userId=${user.uid}`
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
    const deleteQuery = async(queryId: string) => user && fetch(`${getHost()}/search/history/dey?userId=${user.uid}&queryId=${queryId}`, { method: 'DELETE' }).then(() => getQueries())
    useLayoutEffect(() => {
        getQueries()
    },[])
    if (queries.length === 0) return null
    return (
        <div className='flex flex-col w-full gap-1 h-fit'>
            {
                queries.map(qr => <div className='flex items-center justify-between w-full px-3 py-2 bg-black border rounded-lg hover:bg-neutral-800 border-neutral-800' 
                key={qr.createdAt} onClick={() => setQ(qr.query)} >
                    <span className='text-sm capitalize text-neutral-300'>{qr.query}</span>
                    <Button onClick={e => {e.stopPropagation(); deleteQuery(qr.queryId)}} className='!px-2' type='text' size='small'>
                        <BiX size={17} className='shrink-0 text-neutral-400' />
                    </Button>
                </div> 
                )
            }
        </div>
    )
}

export default LastSearchQueries