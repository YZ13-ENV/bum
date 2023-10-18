import { DocShotData } from '@/types'
import { cookies } from 'next/headers'
import dynamic from 'next/dynamic'
import Wrapper from './Wrapper'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/utils/app'
const PrevShotCard = dynamic(() => import('./ui/PrevShotCard'))
const Header = dynamic(() => import('./ui/Header'))

const getPrevShots = async() => {
    const cookie = cookies()
    const uid = cookie.get("uid")
    if (uid && uid.value !== '') {
        try {
            const ref = collection(db, 'users', uid.value, 'shots')
            const q = query(ref, where('isDraft', '==', false))
            const snaps = await getDocs(q)
            const shots = !snaps.empty ? snaps.docs.map(snap => ({ ...snap.data(), doc_id: snap.id }) as DocShotData ) : []
            return shots
        } catch(e) {
            console.log(e);
            return []
        }
    } else return null
}
const PrevWorks = async() => {
    const works = await getPrevShots()
    return (
        <Wrapper>
            <div className="flex flex-col w-full h-full gap-2">
                <Header />
                {
                    works 
                    ? works.length === 0
                    ? <div className='flex flex-col items-center justify-center w-full h-full'>
                        <span className='text-xs text-center text-neutral-400'>Нет последних работ</span>
                    </div>
                    :
                    <div className="grid w-full gap-4 h-fit search_grid">
                        {
                            works.map((shot, index) => 
                                <PrevShotCard key={index} block={shot} />
                            )
                        }
                    </div>
                    : null
                }
            </div>
        </Wrapper>
    )
}

export default PrevWorks