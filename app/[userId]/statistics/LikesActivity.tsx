import { DocShotData } from '@/types'
import React from 'react'
import { BiSolidHeart } from 'react-icons/bi'

type Props = {
    shots: DocShotData[]
}
const LikesActivity = ({ shots }: Props) => {
    const shotsWithLikes = shots.map(shot => shot.likes.length).filter(count => count > 0).length
    const mostLikedShot = shots.sort((a, b) => b.likes.length - a.likes.length)[0]
    return (
        <div className="flex flex-col w-full gap-2 p-4 h-1/2 rounded-xl bg-neutral-900">
            <div className="flex flex-col w-full h-fit">
                <div className="flex items-center w-full gap-2">
                    <BiSolidHeart size={19} />
                    <span className='font-medium text-neutral-300'>Активность по лайкам</span>
                </div>
                <div className="flex flex-col w-full gap-2 py-4 h-fit">
                    <div className="relative w-full h-6 rounded-lg bg-neutral-950">
                        <div style={{ width: `${(shotsWithLikes / (shots?.length || 0)) * 100 }%` }} className="relative w-0 h-full bg-white rounded-lg">
                            <span className='absolute text-xs -right-1 -bottom-5 text-neutral-400'>{shotsWithLikes}</span>
                        </div>
                        <span className={`absolute text-xs -right-2 ${(shotsWithLikes / (shots?.length || 0)) * 100 > 95 ? '-top-5' : '-bottom-5'} text-neutral-400`}>{shots?.length || 0}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between w-full h-full gap-2">
                <div className="flex items-center justify-between w-full h-full gap-2">
                    <div className="flex flex-col justify-center h-full gap-2 w-fit">
                        <span className='text-sm text-neutral-300'>Работ без лайков</span>
                        <span className='text-3xl font-semibold text-neutral-200'>{(shots?.length || 0) - shotsWithLikes}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full h-full gap-2">
                    <div className="flex flex-col justify-center h-full gap-2 w-fit">
                        <span className='text-sm text-neutral-300'>Больше всего лайков</span>
                        <span className='text-3xl font-semibold text-neutral-200'>{mostLikedShot?.likes.length || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LikesActivity