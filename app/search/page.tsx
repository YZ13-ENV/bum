import Shots from '@/components/shared/ui/Shots'
import SearchBar from '@/components/widgets/SearchBar'
import Tabs from '@/components/widgets/Tabs'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import { Input } from 'antd'
import React from 'react'

type Props = {
    searchParams: {
        q: string | null
    }
}
const getSearchedShots = async(q: string | null) => {
    if (q) {
        try {
            const fetchUrl = `${getHost()}/search/shots?q=${q.toLowerCase()}`
            const res = await fetch(fetchUrl)
            if (res.ok) {
                const shots: DocShotData[] = await res.json()
                return shots
            } else return null
        } catch(e) {
            return null
        }
    } else return null
}
const SearchPage = async({ searchParams }: Props) => {
    const shots = await getSearchedShots(searchParams.q)
    return (
        <section className='flex flex-col w-full h-full p-4 md:py-4 md:px-12'>
            <div className="flex items-center justify-center w-full py-4 h-fit">
                <SearchBar q={searchParams.q} />
            </div>
            <Tabs />
            <Shots shots={shots || []} />
        </section>
    )
}

export default SearchPage