import { setRootBlock } from '@/components/entities/uploader/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { auth, storage } from '@/utils/app'
import { Button } from 'antd'
import { ref, deleteObject } from 'firebase/storage'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiTrashAlt } from 'react-icons/bi'
import BlockImage from './BlockImage'
import BlockVideo from './BlockVideo'
import MediaUploadBlock from '@/components/entities/Blocks/UploaderBlocks/MediaUploadBlock'

const RootBlock = () => {
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const rootBlock = useAppSelector(state => state.uploader.shot.rootBlock)
    const deleteImageFromRootBlock = async() => {
        if (user && rootBlock.link !== '') {
            dispatch(setRootBlock({ type: 'image', link: '' }))
            const imageRef = ref(storage, rootBlock.link)
            await deleteObject(imageRef)
        }
    }
    if (rootBlock.link !== '') {
        if (rootBlock.type === 'image' ) {
            return (
                <div className="relative w-full h-fit shrink-0">
                    <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-3 h-fit">
                        <Button className='!px-2' onClick={deleteImageFromRootBlock}><BiTrashAlt size={17} /></Button>
                    </div>
                    <BlockImage imageLink={rootBlock.link} />
                </div>
            )
        }
        if (rootBlock.type === 'video') {
            return (
                <div className="relative w-full h-[32rem] !shrink-0">
                    <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-3 h-fit">
                        <Button className='!px-2' onClick={deleteImageFromRootBlock}><BiTrashAlt size={17} /></Button>
                    </div>
                    <BlockVideo block={rootBlock} />
                    {/* <BlockImage imageLink={rootBlock.link} /> */}
                </div>
            )
        }
    }
    return (
        <MediaUploadBlock />
    )
}

export default RootBlock