'use client'
import React, { useEffect, useState } from 'react'
import { BiChevronLeft, BiChevronRight, BiPlus, BiTrashAlt, BiX } from 'react-icons/bi'
import ShortGridUploader from './ShortGridUploader'
import { ShotGridBlock } from '@/types'
import MediaBlock from '../MediaBlock'
import { usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { getHost } from '@/helpers/getHost'
import { setBlocks } from '../../uploader/draft.store'
import { Button } from 'antd'
import { useTimeout } from 'ahooks'

type Props = {
    block: ShotGridBlock
    index?: number
}
const ShortGridBlock = ({ block, index }: Props) => {
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const [uploadMode, setUploadMode] = useState<boolean>(block.ids.length === 0 ? true : false)
    const [debouncedItem, setDebouncedItem] = useState<number>(0)
    const [selectedItem, setSelectedItem] = useState<number>(0)
    const draft = useAppSelector(state => state.uploader.draft)
    const path = usePathname()
    const isNotUploaderPage = path !== '/uploads/shot'
    const [transitionBetweenImages, setTransitionBetweenImages] = useState<boolean>(false)
    const [delay, setDelay] = useState<number | undefined>(undefined)
    const clear = useTimeout(() => {
        setTransitionBetweenImages(false)
        changeItem(debouncedItem)
        setDelay(undefined)
    }, delay)
    useEffect(() => {
        setTransitionBetweenImages(true)
        setDelay(250)
    },[debouncedItem])
    useEffect(() => {
        if (block.ids.length === 0) {
            setUploadMode(true)
        } else {
            setUploadMode(false)
        }
    },[block.ids])
    const changeItem = (index: number) => setSelectedItem(index)
    const deleteImage = async(idIndex: number) => {
        if (user && block.ids.length !== 0) {
            const res = await fetch(`${getHost()}/files/file?link=${block.ids[idIndex]}`, { method: "DELETE" })
            if (res.ok) {
                const updatedBlocks = draft.blocks.map((_, blockIndex) => {
                    if (blockIndex === index && _.type === 'shotGrid') {
                        const updatedBlock: ShotGridBlock = {
                            ..._,
                            ids: _.ids.filter((id, i) => i !== idIndex)
                        }
                        return updatedBlock
                    } else return _
                })
                dispatch(setBlocks(updatedBlocks))
            }
        }
    }
    const moveToLeft = (idIndex: number) => {
        const currentIndex = idIndex
        const targetIndex = idIndex - 1
        const currentId = block.ids[currentIndex]
        const targetId = block.ids[targetIndex]
        const updatedBlocks = draft.blocks.map((_, blockIndex) => {
            if (blockIndex === index && _.type === 'shotGrid') {
                const updatedIds = _.ids.map((id, indexId) => {
                    if (indexId === targetIndex) return currentId
                    if (indexId === currentIndex) return targetId
                    return id
                })
                const updatedBlock: ShotGridBlock = {
                    ..._,
                    ids: updatedIds
                }
                return updatedBlock
            } else return _
        })
        dispatch(setBlocks(updatedBlocks))
    }
    const moveToRight = (idIndex: number) => {
        const currentIndex = idIndex
        const targetIndex = idIndex + 1
        const currentId = block.ids[currentIndex]
        const targetId = block.ids[targetIndex]
        const updatedBlocks = draft.blocks.map((_, blockIndex) => {
            if (blockIndex === index && _.type === 'shotGrid') {
                const updatedIds = _.ids.map((id, indexId) => {
                    if (indexId === targetIndex) return currentId
                    if (indexId === currentIndex) return targetId
                    return id
                })
                const updatedBlock: ShotGridBlock = {
                    ..._,
                    ids: updatedIds
                }
                return updatedBlock
            } else return _
        })
        dispatch(setBlocks(updatedBlocks))
    }
    return (
        <div className='flex flex-col w-full gap-2 p-2 h-fit'>
            {
                uploadMode && index !== undefined
                ? <ShortGridUploader block={block} index={index} />
                :
                <div style={{ scale: transitionBetweenImages ? .95 : 1 }} className="flex items-center transition-all justify-center w-full aspect-[4/3] shrink-0 rounded-xl bg-neutral-900">
                    { block.ids[selectedItem] && <MediaBlock link={block.ids[selectedItem]} object='cover' /> }
                </div>
            }
            <div className="flex items-center w-full gap-2 shrink-0 h-fit">
                {
                    block.ids.map((item, index) =>
                        <div onClick={() => setDebouncedItem(index)} key={item} 
                        className={`relative w-1/4 aspect-[4/3] rounded-xl transition-all cursor-pointer ring-2 ${selectedItem === index ? 'ring-white' : 'ring-transparent scale-95 hover:ring-neutral-400'} bg-neutral-900`}>
                            { !isNotUploaderPage &&  <div className="absolute z-20 top-1 right-1"><Button size='small' onClick={() => deleteImage(index)}><BiTrashAlt size={13} /></Button></div> }
                            { 
                                !isNotUploaderPage && index !== 0 && <div onClick={() => moveToLeft(index)}
                                className='absolute top-0 left-0 z-10 flex items-center h-full px-1 hover:bg-gradient-to-r hover:from-white rounded-l-xl hover:to-transparent'>
                                    <BiChevronLeft size={21} className='text-black' />
                                </div>
                            }
                            {
                                !isNotUploaderPage && index !== (block.ids.length - 1) && <div onClick={() => moveToRight(index)}
                                className='absolute top-0 right-0 z-10 flex items-center h-full px-1 hover:bg-gradient-to-l hover:from-white rounded-r-xl hover:to-transparent'>
                                    <BiChevronRight size={21} className='text-black' />
                                </div>
                            }
                            <MediaBlock link={item} object='cover' />
                        </div>
                    )
                }
                { 
                    !isNotUploaderPage && block.ids.length <= 3 && <div onClick={() => setUploadMode(!uploadMode)}
                    className='w-1/4 border border-neutral-700 aspect-[4/3] flex items-center justify-center rounded-xl transition-all cursor-pointer ring-2 ring-transparent hover:ring-neutral-400'>
                        {
                            uploadMode 
                            ? <BiX size={25} />
                            : <BiPlus size={25} />
                        }
                    </div> 
                }
            </div>
        </div>
    )
}

export default ShortGridBlock