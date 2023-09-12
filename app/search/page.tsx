import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import dynamic from 'next/dynamic'
const Shots = dynamic(() => import('@/components/shared/Shots'))
const SearchBar = dynamic(() => import('@/components/widgets/SearchBar')) 
const Tabs = dynamic(() => import('@/components/widgets/Tabs')) 

type Props = {
    searchParams: {
        q: string | null,
        order: string
    }
}
const getSearchedShots = async(q: string | null, order: string='popular') => {
    if (q) {
        try {
            const fetchUrl = `${getHost()}/search/shots?q=${q.toLowerCase()}&order=${order}`
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
    const shots = await getSearchedShots(searchParams.q, searchParams.order)
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