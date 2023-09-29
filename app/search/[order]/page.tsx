import Shots from '@/components/shared/Shots'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import React from 'react'

type Props = {
    params: {
        order: string
    }
    searchParams: {
        q: string | null,
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
            } else return []
        } catch(e) {
            return []
        }
    } else return []
}
const SearchShotsWithOrder = async({ params, searchParams }: Props) => {
    const shots = await getSearchedShots(searchParams.q, params.order)
    return <Shots shots={shots} />
}

export default SearchShotsWithOrder