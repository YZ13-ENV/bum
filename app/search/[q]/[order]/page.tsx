import { getSearchedShots } from '@/app/fetchers'
import Shots from '@/components/shared/Shots'
import React from 'react'

type Props = {
    params: {
        order: string
        q: string
    }
}

const SearchShotsWithOrder = async({ params }: Props) => {
    const shots = await getSearchedShots(params.q, params.order)
    return <Shots shots={shots} />
}

export default SearchShotsWithOrder