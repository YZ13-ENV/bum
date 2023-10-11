import React from 'react'
import { BiExpandAlt, BiX } from 'react-icons/bi'

const Loading = () => {
    return (
        <div className='flex items-start w-full h-full gap-4'>
            <div className="flex flex-col w-2/3 h-full gap-4 pr-2 overflow-y-auto shrink-0">
                <div className="w-full aspect-[4/3] rounded-xl bg-neutral-900 animate-pulse shrink-0" />
                <div className="flex flex-col w-full h-full gap-4 px-8">
                </div>
            </div>
            <div className="flex flex-col w-1/3 h-full gap-4">
                <div className="flex items-center justify-end w-full gap-4 h-fit">
                    <BiExpandAlt size={18} className='text-neutral-400' />
                    <BiX size={21} className='text-neutral-400' />
                </div>
                <div className="flex flex-col w-full gap-2 h-fit">
                    <div className="w-full h-6 rounded-md bg-neutral-900 animate-pulse"></div>
                    <div className="w-1/2 h-6 rounded-md bg-neutral-900 animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between w-full gap-2 h-fit">
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <div className="w-8 h-8 rounded-full bg-neutral-900 animate-pulse shrink-0" />
                        <div className="w-40 h-6 rounded-md bg-neutral-900 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <div className="w-20 h-8 rounded-lg bg-neutral-900 animate-pulse"></div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-24 gap-2 p-2 border rounded-lg border-neutral-700">
                    <div className="flex items-center w-full gap-2 h-fit">
                        <div className="w-1/3 h-6 rounded-md bg-neutral-900 animate-pulse" />
                        <div className="w-2/3 h-6 rounded-md bg-neutral-900 animate-pulse" />
                    </div>
                    <div className="flex flex-wrap items-start w-full h-full gap-1">

                        <div className="w-12 h-4 rounded-full bg-neutral-900 animate-pulse" />
                        <div className="w-24 h-4 rounded-full bg-neutral-900 animate-pulse" />
                        <div className="w-8 h-4 rounded-full bg-neutral-900 animate-pulse" />

                        <div className="w-12 h-4 rounded-full bg-neutral-900 animate-pulse" />
                        <div className="w-8 h-4 rounded-full bg-neutral-900 animate-pulse" />

                        <div className="w-24 h-4 rounded-full bg-neutral-900 animate-pulse" />
                        <div className="w-12 h-4 rounded-full bg-neutral-900 animate-pulse" />
                    </div>
                </div>
                <div className="flex flex-col w-full h-full gap-2 px-2">
                    <div className="w-full h-20 rounded-lg bg-neutral-900 animate-pulse"></div>
                    <div className="w-full h-20 rounded-lg bg-neutral-900 animate-pulse"></div>
                    <div className="w-full h-20 rounded-lg bg-neutral-900 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading