import UploaderIcons from '@/components/shared/ui/Animated/UploaderIcons'
import { checkFile, checkOnlyImageFile } from '@/helpers/checkFile'
import { randomString } from '@/helpers/randomString'
import { auth } from '@/utils/app'
import { Button, UploadProps, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setBlocks, setDraftId, setRootBlock, setThumbnail } from '../../uploader/store'
import { ImageBlock, Thumbnail, VideoBlock } from '@/types'
import { BiLoaderAlt, BiTrashAlt } from 'react-icons/bi'
import MediaBlock from '.'
import { uploadMedia, uploadMediaThumbnail } from '@/helpers/uploadMedia'
import { getStorageHost } from '@/helpers/getHost'

type Props = {
    block: ImageBlock | VideoBlock
    isRootBlock?: boolean
    uploadOnlyImages?: boolean
    index?: number
}
const MediaUploader = ({ block, uploadOnlyImages=true, index, isRootBlock=false }: Props) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const uploader = useAppSelector(state => state.uploader)
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        fileList: [],
        progress: undefined,
        action: async(file) => {
            if (user) {
                setLoading(true)
                const generatedId = randomString(20)
                if (isRootBlock) {
                    !uploader.draftId ? dispatch(setDraftId(generatedId)) : ''
                    !uploader.draftId ? message.info(`Текущий драфт ${generatedId}`) : message.info(`Текущий драфт ${uploader.draftId}`) 
                    const checkedFile = uploadOnlyImages ? checkOnlyImageFile(user.uid, uploader.draftId ? uploader.draftId : generatedId, file) : checkFile(user.uid, uploader.draftId ? uploader.draftId : generatedId, file)
                    if (checkedFile) {
                        setLoading(true)
                        const uploadedFile = new Promise<string | null>(async(res, rej) => {
                            const uploadedFile = await uploadMedia(user.uid, uploader.draftId ? uploader.draftId : generatedId, file)
                            res(uploadedFile)
                        })
                        const uploadedThumbnail = new Promise<Thumbnail | null>(async(res, rej) => {
                            const thumbnail = await uploadMediaThumbnail(user.uid, uploader.draftId ? uploader.draftId : generatedId, file)
                            res(thumbnail)
                        })
                        uploadedFile.then((link) => {
                            if (link) {
                                console.log(link)
                                dispatch(setRootBlock({ type: checkedFile.type, link: link }))
                                message.success('Изображение загруженно')
                                setLoading(false)
                            } 
                        })
                        .catch(why => message.error('Что-то пошло не так и изображение не загрузилось'))
                        uploadedThumbnail.then((thumbnail) => {
                            if (thumbnail) {
                                console.log(thumbnail)
                                dispatch(setThumbnail(thumbnail))
                                message.success('Обложка для работы загружена')
                            }
                            else setLoading(false)
                        })
                        .catch(why => message.error('Что-то пошло не так и изображение не загрузилось'))
                        return uploader.shot.rootBlock.link
                    }
                    setLoading(false)
                    return ''
                } else {
                    const checkedFile: ImageBlock | null = checkOnlyImageFile(user.uid, uploader.draftId ? uploader.draftId : generatedId, file)
                    if (checkedFile) {
                        const uploadedFile = await uploadMedia(user.uid, uploader.draftId ? uploader.draftId : generatedId, file)
                        if (uploadedFile) {
                            const updatedBlocks = uploader.shot.blocks.map((_, blockIndex) => {
                                if (blockIndex === index) {
                                    const updatedBlock: ImageBlock = {
                                        link: uploadedFile,
                                        type: checkedFile.type
                                    }
                                    return updatedBlock
                                } else return _
                            })
                            dispatch(setBlocks(updatedBlocks))
                            setLoading(false)
                            return uploadedFile
                        }
                        setLoading(false)
                        return ''
                    }
                    setLoading(false)
                    return ''
                }
            } else return ''
        }
    };
    const deleteImage = async() => {
        if (user && block.link !== '') {
            await fetch(`${getStorageHost()}/files/file?link=${block.link}`, { method: "DELETE" })
            if (isRootBlock) {
                dispatch(setRootBlock({ type: 'image', link: '' }))
                if (uploader.shot.thumbnail) {
                    await fetch(`${getStorageHost()}/files/file?link=${uploader.shot.thumbnail.link}`, { method: "DELETE" })
                    dispatch(setThumbnail(null))
                }
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
                <MediaBlock {...block} autoPlay object='contain' quality={75} />
            </div>
        )
    }
    return (
        <Dragger disabled={loading} className='!h-[32rem] !shrink-0' {...props} defaultFileList={[]}>
            <div className="flex flex-col items-center justify-center w-full max-w-lg gap-6 mx-auto h-fit">
                {
                    loading 
                    ? <div className='flex items-center justify-center w-full h-fit'><BiLoaderAlt size={36} className='text-neutral-200 animate-spin' /></div>
                    : <UploaderIcons />
                }
                {
                    loading 
                    ? <div className='flex items-center justify-center w-full h-fit'>
                        <p className="text-sm text-center text-neutral-400">Теперь подождите пока файл загрузится...</p>
                    </div>
                    : <>
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
                    </>
                }

            </div>
        </Dragger>
    )
}

export default MediaUploader