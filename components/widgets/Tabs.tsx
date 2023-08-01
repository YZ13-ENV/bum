import React from 'react'
import { BiX } from 'react-icons/bi'
const Tabs = () => {
    return (
        <div className='flex items-center justify-start w-full gap-2 p-3 h-14'>
            <div className="flex items-center h-full gap-1 px-4 border w-fit rounded-xl border-neutral-800 bg-neutral-900">
                <span className='text-xs text-neutral-400'>Все</span>
                {/* <BiX size={14} className='text-neutral-400' />     */}
            </div>
            <div className="flex items-center h-full gap-1 px-4 border w-fit rounded-xl border-neutral-800 bg-neutral-900">
                <span className='text-xs text-neutral-400'>Подписки</span>
                {/* <BiX size={14} className='text-neutral-400' />     */}
            </div>
            <div className="flex items-center h-full gap-1 px-4 border w-fit rounded-xl border-neutral-800 bg-neutral-900">
                <span className='text-xs text-neutral-400'>Мои</span>
                {/* <BiX size={14} className='text-neutral-400' />     */}
            </div>
        </div>
    )
}

export default Tabs