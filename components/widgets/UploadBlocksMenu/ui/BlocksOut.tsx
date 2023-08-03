import { useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import { BiLock } from 'react-icons/bi'
import BlockImage from '../../UploadBlockView/ui/BlockImage'

const BlocksOut = () => {
    const uploader = useAppSelector(state => state.uploader)
    return (
        <div className="flex flex-col w-full h-full gap-2">
            {
                uploader.shot.rootBlock.link === ''
                ?
                <div className="flex flex-col items-center justify-center w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950">
                    <BiLock size={24} className='text-neutral-400' />
                </div>
                : <div className="w-full h-56"><BlockImage imageLink={uploader.shot.rootBlock.link} /></div>
            }
            {
                uploader.shot.blocks.map((block, index) => 
                    <div key={`block#${index}`} 
                    className="flex flex-col items-center justify-center w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950"/>
                )
            }
        </div>
    )
}

export default BlocksOut