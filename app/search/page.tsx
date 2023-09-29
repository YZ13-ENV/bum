import { redirect } from 'next/navigation'

type Props = {
    searchParams: {
        q: string | null,
    }
}

const SearchPage = async({ searchParams }: Props) => {
    return redirect(`/search/popular?q=${searchParams.q}`)
}

export default SearchPage