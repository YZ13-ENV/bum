import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { getUserShort } from './helpers'
const ProfileContent = dynamic(() => import('@/components/widgets/Profile')) 
// const UserProfileTabs = dynamic(() => import('@/components/widgets/UserProfileTabs')) 

type Props = {
    params: {
        userId: string
    },
    searchParams: {
        tab: string | null
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 
    try {
        const user = await getUserShort(params.userId)
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

const UserPage = async({ params, searchParams }: Props) => {
    return (
        <section className="w-full h-full">
            <div className="flex flex-col w-full h-full gap-4">
                <Suspense fallback={<div className='flex items-center justify-center w-full h-full'><BiLoaderAlt size={17} className='animate-spin' /></div>}>
                    <ProfileContent userId={params.userId} />
                </Suspense>
            </div>
        </section>
    )
}

export default UserPage