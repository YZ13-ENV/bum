import { redirect } from 'next/navigation'

type Props = {
    params: {
        q: string | null,
    }
}

const SearchPage = async({ params }: Props) => {
    return redirect(`/search/${params.q}/popular`)
}

export default SearchPage