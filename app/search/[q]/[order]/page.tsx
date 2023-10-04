import Shots from '@/components/shared/Shots'
import { getHost } from '@/helpers/getHost'
import { DocShotData } from '@/types'
import React from 'react'

type Props = {
    params: {
        order: string
        q: string
    }
}
const getSearchedShots = async(q: string | null, order: string='popular') => {
    if (q) {
        try {
            const fetchUrl = `${getHost()}/search/query/${q.toLowerCase()}/${order}`
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
const SearchShotsWithOrder = async({ params }: Props) => {
    const shots = await getSearchedShots(params.q, params.order)
    return <Shots shots={shots} />
}

export default SearchShotsWithOrder