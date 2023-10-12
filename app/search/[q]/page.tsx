import { getSearchedShots } from '@/app/fetchers'
import Shots from '@/components/shared/Shots'

type Props = {
    params: {
        q: string | null,
    }
}

const SearchPage = async({ params }: Props) => {
    const shots = await getSearchedShots(params.q, 'popular')
    return <Shots shots={shots} />
}

export default SearchPage