import { DocShotData } from '@/types'
import ShotActions from './ShotActions'
import AuthorSnippet from './AuthorSnippet'
import { Suspense, memo } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {
    shot: DocShotData
}

const ShotInfo = ({ shot }: Props) => {
    return (
        <div className={`absolute bottom-0 left-0 z-20 flex items-center justify-between w-full gap-2 p-4 rounded-b-xl h-fit bg-gradient-to-t from-black to-transparent`}>
            <h2 className='text-base font-medium text-neutral-200 line-clamp-1'>{shot.title}</h2>
            <div className="flex items-center gap-2 pl-2 bg-black rounded-full shrink-0 w-fit h-fit">
                <div className="flex items-center gap-2 py-1.5 w-fit h-fit"><ShotActions shot={shot} /></div>
                <Suspense fallback={<BiLoaderAlt className='mr-2 animate-spin' />}>
                    <AuthorSnippet uid={shot.authorId} />
                </Suspense>
            </div>
        </div>
    )
}

export default memo(ShotInfo)