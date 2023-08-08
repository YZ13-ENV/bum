import UploaderIcons from '@/components/shared/ui/Animated/UploaderIcons'
import { checkFile, checkOnlyImageFile } from '@/helpers/checkFile'
import { randomString } from '@/helpers/randomString'
import { auth, storage } from '@/utils/app'
import { Button, UploadProps } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { deleteObject, ref, uploadBytes } from 'firebase/storage'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks, setDraftId, setRootBlock } from '../../uploader/store'
import { ImageBlock, VideoBlock } from '@/types'
import { BiTrashAlt } from 'react-icons/bi'
import BlockImage from '@/components/widgets/Blocks/BlockImage'
import BlockVideo from '@/components/widgets/Blocks/BlockVideo'
import MediaBlock from '.'

type Props = {
    block: ImageBlock | VideoBlock
    isRootBlock?: boolean
    uploadOnlyImages?: boolean
    index?: number
}
const MediaUploader = ({ block, uploadOnlyImages=true, index, isRootBlock=false }: Props) => {
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const uploader = useAppSelector(state => state.uploader)
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        action: async(file) => {
            if (user) {
                const generatedId = randomString(20)
                if (isRootBlock) {
                    const checkedFile = uploadOnlyImages ? checkOnlyImageFile(user.uid, uploader.draftId ? uploader.draftId : generatedId, file) : checkFile(user.uid, uploader.draftId ? uploader.draftId : generatedId, file)
                    if (checkedFile && !uploader.draftId) {
                        const refTo = ref(storage, checkedFile.link)
                        const arrBuffer = await file.arrayBuffer()
                        await uploadBytes(refTo, arrBuffer)
                        dispatch(setDraftId(generatedId))
                        dispatch(setRootBlock({ type: checkedFile.type, link: checkedFile.link }))
                        return refTo.fullPath
                    } 
                    if (checkedFile && uploader.draftId) {
                        const refTo = ref(storage, checkedFile.link)
                        const arrBuffer = await file.arrayBuffer()
                        await uploadBytes(refTo, arrBuffer)
                        dispatch(setRootBlock({ type: checkedFile.type, link: checkedFile.link }))
                        return refTo.fullPath
                    } 
                    return ''
                } else {
                    const checkedFile: ImageBlock | null = checkOnlyImageFile(user.uid, uploader.draftId ? uploader.draftId : generatedId, file)
                    if (checkedFile) {
                        const refTo = ref(storage, checkedFile.link)
                        const arrBuffer = await file.arrayBuffer()
                        const uploaded =  await uploadBytes(refTo, arrBuffer)
                        const updatedBlocks = uploader.shot.blocks.map((_, blockIndex) => {
                            if (blockIndex === index) {
                                const updatedBlock: ImageBlock = {
                                    link: checkedFile.link,
                                    type: checkedFile.type
                                }
                                return updatedBlock
                            } else return _
                        })
                        dispatch(setBlocks(updatedBlocks))
                        return uploaded.ref.fullPath
                    }
                    return ''
                }
            } else return ''
        }
    };
    const deleteImage = async() => {
        if (user && block.link !== '') {
            const imageRef = ref(storage, block.link)
            await deleteObject(imageRef)
            if (isRootBlock) {
                dispatch(setRootBlock({ type: 'image', link: '' }))
            } else {
                const updatedBlocks = uploader.shot.blocks.map((_, blockIndex) => {
                    if (blockIndex === index) {
                        const updatedBlock: ImageBlock = {
                            link: '',
                            type: 'image'
                        }
                        return updatedBlock
                    } else return _
                })
                dispatch(setBlocks(updatedBlocks))
            }
        }
    }
    if (block.link && block.link !== '') {
        return (
            <div className="relative w-full h-fit !shrink-0">
                <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-3 h-fit">
                    <Button className='!px-2' onClick={deleteImage}><BiTrashAlt size={17} /></Button>
                </div>
                <MediaBlock {...block} />
            </div>
        )
    }
    return (
        <Dragger className='!h-[32rem] !shrink-0' {...props}>
            <div className="flex flex-col items-center justify-center w-full max-w-lg gap-6 mx-auto h-fit">
                <UploaderIcons />
                <div className="flex flex-col w-full gap-2 h-fit">
                    <p className="text-base font-semibold text-center text-neutral-200">Нажмите, или перетащите файл для внесение в работу</p>
                    <p className="text-sm text-center text-neutral-400">Максимальный размер каждого изображения - 10MB, макс. файлов - 5</p>
                    { !uploadOnlyImages && <p className="text-sm text-center text-neutral-400">Максимальный размер видео - 20MB</p> }
                </div>
                <div className="grid w-full grid-cols-2 grid-rows-2 px-2 h-1/2">
                    <div className="flex items-start justify-start w-full h-full">
                        <li className='text-sm list-disc text-start text-neutral-400'>Изображения (.jpg, .png)</li>
                    </div>
                    {
                        !uploadOnlyImages &&
                        <>
                            <div className="flex items-start justify-start w-full h-full">
                                <li className='text-sm list-disc text-start text-neutral-400'>Видео (.mp4)</li>
                            </div>
                            <div className="flex items-start justify-start w-full h-full">
                                <li className='text-sm list-disc text-start text-neutral-400'>Анимированные GIF (.gif)</li>
                            </div>
                        </>
                    }
                    <div className="flex items-start justify-start w-full h-full">
                        <li className='text-sm list-disc text-start text-neutral-400'>Загружайте, только то что принадлежит вам</li>
                    </div>
                </div>
            </div>
        </Dragger>
    )
}

export default MediaUploader