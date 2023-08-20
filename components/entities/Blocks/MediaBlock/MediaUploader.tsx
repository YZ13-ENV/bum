import UploaderIcons from '@/components/shared/ui/Animated/UploaderIcons'
import { checkFile, checkOnlyImageFile } from '@/helpers/checkFile'
import { randomString } from '@/helpers/randomString'
import { auth } from '@/utils/app'
import { Button, UploadProps, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { ImageBlock, Thumbnail, VideoBlock } from '@/types'
import { BiLoaderAlt, BiTrashAlt } from 'react-icons/bi'
import MediaBlock from '.'
import { uploadMedia, uploadMediaThumbnail } from '@/helpers/uploadMedia'
import { getStorageHost } from '@/helpers/getHost'
import { RcFile } from 'antd/es/upload'
import { setRootBlock, setThumbnail, setBlocks } from '@/components/entities/uploader/draft.store'
import { setDraftId } from '../../uploader/modal.store'

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
    const modals = useAppSelector(state => state.uploader.modals)
    const draft = useAppSelector(state => state.uploader.draft)
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        fileList: [],
        progress: undefined,
        customRequest: async(opt) => {
            // console.log(opt)
            if (opt.action !== '' && user) {
                const generatedId = randomString(20)
                const targetDraft = modals.draftId ? modals.draftId : generatedId
                if (isRootBlock) {
                    setLoading(true)
                    const uploadedFile = new Promise<string | null>(async(res, rej) => {
                        const uploadedFile = await uploadMedia(user.uid, targetDraft, opt.file as RcFile)
                        res(uploadedFile)
                    })
                    const uploadedThumbnail = new Promise<Thumbnail | null>(async(res, rej) => {
                        const thumbnail = await uploadMediaThumbnail(user.uid, targetDraft, opt.file as RcFile)
                        res(thumbnail)
                    })
                    uploadedFile.then((link) => {
                        if (link) {
                            console.log(link)
                            dispatch(setRootBlock({ type: draft.rootBlock.type, link: link }))
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
                            setLoading(false)
                        }
                        else setLoading(false)
                    })
                    .catch(why => message.error('Что-то пошло не так и изображение не загрузилось'))
                } else {
                        const uploadedFile = await uploadMedia(user.uid, targetDraft, opt.file as RcFile)
                        if (uploadedFile) {
                            message.success('Изображение загруженно')
                            const updatedBlocks = draft.blocks.map((_, blockIndex) => {
                                if (blockIndex === index && _.type === 'image') {
                                    const updatedBlock: ImageBlock = {
                                        link: uploadedFile,
                                        type: _.type
                                    }
                                    return updatedBlock
                                } else return _
                            })
                            dispatch(setBlocks(updatedBlocks))
                            setLoading(false)
                        }
                }
            }
        },
        action: async(file) => {
            if (user) {
                // setLoading(true)
                const generatedId = randomString(20)
                if (isRootBlock) {
                    !modals.draftId ? dispatch(setDraftId(generatedId)) : ''
                    const checkedFile = uploadOnlyImages ? checkOnlyImageFile(user.uid, modals.draftId ? modals.draftId : generatedId, file) : checkFile(user.uid, modals.draftId ? modals.draftId : generatedId, file)
                    if (checkedFile) {
                        !modals.draftId ? message.info(`Текущий драфт ${generatedId}`) : message.info(`Текущий драфт ${modals.draftId}`) 
                        dispatch(setRootBlock({ type: checkedFile.type, link: '' }))
                        return checkedFile.link
                    } else return ''
                } else {
                    const checkedFile = checkOnlyImageFile(user.uid, modals.draftId ? modals.draftId : generatedId, file)
                    if (checkedFile) {
                        const updatedBlocks = draft.blocks.map((_, blockIndex) => {
                            if (blockIndex === index) {
                                const updatedBlock: ImageBlock = {
                                    link: '',
                                    type: checkedFile.type
                                }
                                return updatedBlock
                            } else return _
                        })
                        dispatch(setBlocks(updatedBlocks))
                        return checkedFile.link
                    } else return ''
                }
            } return ''
        }
    }



    const deleteImage = async() => {
        if (user && block.link !== '') {
            setLoading(true)
            const res = await fetch(`${getStorageHost()}/files/file?link=${block.link}`, { method: "DELETE" })
            if (res.ok) {
                message.info('Файл был удалён')
                if (isRootBlock) {
                    dispatch(setRootBlock({ type: 'image', link: '' }))
                    if (draft.thumbnail) {
                        const thumbRes = await fetch(`${getStorageHost()}/files/file?link=${draft.thumbnail.link}`, { method: "DELETE" })
                        if (thumbRes.ok) {
                            message.info('Обложка была удалена')
                            dispatch(setThumbnail(null))
                            setLoading(false)
                        } else setLoading(false)
                    } else setLoading(false)
                } else {
                    const updatedBlocks = draft.blocks.map((_, blockIndex) => {
                        if (blockIndex === index) {
                            const updatedBlock: ImageBlock = {
                                link: '',
                                type: 'image'
                            }
                            return updatedBlock
                        } else return _
                    })
                    dispatch(setBlocks(updatedBlocks))
                    setLoading(false)
                }
            }
        }
    }
    if (block.link && block.link !== '') {
        return (
            <div className="relative w-full h-fit !shrink-0">
                <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-3 h-fit">
                    <Button className='!px-2' loading={loading} onClick={deleteImage} icon={<BiTrashAlt size={15} className='inline-block mb-1' />}>Удалить</Button>
                </div>
                <MediaBlock {...block} autoPlay object='contain' quality={75} />
            </div>
        )
    }
    return (
        <Dragger disabled={loading} className='md:!h-[32rem] !aspect-[4/3] !shrink-0' {...props} defaultFileList={[]}>
            <div className="flex flex-col items-center justify-center w-full max-w-lg gap-6 p-4 mx-auto md:p-0 h-fit">
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
                            <p className="text-sm font-semibold text-center md:text-base text-neutral-200">Нажмите, или перетащите файл для внесение в работу</p>
                            <p className="text-xs text-center md:text-sm text-neutral-400">Максимальный размер каждого изображения - 10MB, макс. файлов - 5</p>
                            { !uploadOnlyImages && <p className="text-xs text-center md:text-sm text-neutral-400">Максимальный размер видео - 20MB</p> }
                        </div>
                        <div className="grid w-full grid-cols-2 grid-rows-2 px-2 h-1/2">
                            <div className="flex items-start justify-start w-full h-full">
                                <li className='text-xs list-disc md:text-sm text-start text-neutral-400'>Изображения (.jpg, .png)</li>
                            </div>
                            {
                                !uploadOnlyImages &&
                                <>
                                    <div className="flex items-start justify-start w-full h-full">
                                        <li className='text-xs list-disc md:text-sm text-start text-neutral-400'>Видео (.mp4)</li>
                                    </div>
                                    <div className="flex items-start justify-start w-full h-full">
                                        <li className='text-xs list-disc md:text-sm text-start text-neutral-400'>Анимированные GIF (.gif)</li>
                                    </div>
                                </>
                            }
                            <div className="flex items-start justify-start w-full h-full">
                                <li className='text-xs list-disc md:text-sm text-start text-neutral-400'>Загружайте, только то что принадлежит вам</li>
                            </div>
                        </div>
                    </>
                }

            </div>
        </Dragger>
    )
}

export default MediaUploader