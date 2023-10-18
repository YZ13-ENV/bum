import { Metadata } from 'next'
import { Suspense } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { getShortByNickname } from '../fetchers'
import Chunker from '@/components/widgets/ChunkModule/Chunker'

type Props = {
    params: {
        nickname: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 
    try {
        const user = await getShortByNickname(params.nickname)
        if (user) {
            return {
                title: user?.displayName || 'Пользователь',
            }
        } else return {}
    } catch(e) {
        return {
            title: 'Ошибка'
        }
    }
 

}

const UserPage = async({ params }: Props) => {
    return (
        <section className="w-full h-full">
            <div className="flex flex-col w-full h-full gap-4">
                <Suspense fallback={<div className='flex items-center justify-center w-full h-full'><BiLoaderAlt size={17} className='animate-spin' /></div>}>
                    <Chunker countPrefix={`/shots/user/count/${params.nickname}/new`} shotsPrefix={`/shots/user/${params.nickname}/new`} />
                </Suspense>
            </div>
            {/* <Footer></Footer> */}
        </section>
    )
}

export default UserPage