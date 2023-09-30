import UploaderIcons from '@/components/shared/Animated/UploaderIcons'
import { checkFile, checkOnlyImageFile } from '@/helpers/checkFile'
import { randomString } from '@/helpers/randomString'
import { auth } from '@/utils/app'
import { Button, UploadProps, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { ImageBlock, VideoBlock } from '@/types'
import { BiLoaderAlt, BiTrashAlt } from 'react-icons/bi'
import MediaBlock from '.'
// import { uploadMedia } from '@/helpers/uploadMedia'
import { getHost } from '@/helpers/getHost'
import { RcFile } from 'antd/es/upload'
import { setRootBlock, setThumbnail, setBlocks } from '@/components/entities/uploader/draft.store'
import { setDraftId } from '../../uploader/modal.store'
import { uploadShot_POST } from '@/helpers/shot'
import { uploadedFile, uploadedThumbnail } from './helper'
import { useDebounceEffect } from 'ahooks'
import UploaderConditions from './UploaderConditions'
// import { fetchFile } from '@/helpers/fetchFile'

type Props = {
    block: ImageBlock | VideoBlock
    isRootBlock?: boolean
    uploadOnlyImages?: boolean
    index?: number
}

const MediaUploader = ({ block, uploadOnlyImages=true, index, isRootBlock=false }: Props) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const [previewLink, setPreviewLink] = useState<string>('')
    const [predictedType, setPredictedType] = useState<'image' | 'video'>('image')
    const isSubscriber = useAppSelector(state => state.user.isSubscriber)
    const dispatch = useAppDispatch()
    const modals = useAppSelector(state => state.uploader.modals)
    const finalTouch = modals.finalTouchModal
    const draft = useAppSelector(state => state.uploader.draft)
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        fileList: [],
        progress: undefined,
        customRequest: async(opt) => {
            if (opt.action !== '' && user) {
                const generatedId = randomString(30)
                const targetDraft = modals.draftId ? modals.draftId : generatedId
                if (isRootBlock) {
                    setLoading(true)
                    uploadedFile(user.uid, targetDraft, opt.file as RcFile)
                    .then((link) => {
                        if (link) {
                            dispatch(setRootBlock({ type: draft.rootBlock.type, link: link }))
                            message.success('Файл загружен')
                            setLoading(false)
                            uploadShot_POST(user.uid, targetDraft, draft)
                        } 
                    })
                    .finally(() => setLoading(false))
                    .catch(why => {
                        message.error('Что-то пошло не так и изображение не загрузилось')
                        message.loading('Пробуем снова загрузить')
                        setLoading(true)
                        uploadedFile(user.uid, targetDraft, opt.file as RcFile)
                        .finally(() => setLoading(false))
                        .then((link) => {
                            if (link) {
                                dispatch(setRootBlock({ type: draft.rootBlock.type, link: link }))
                                message.success('Файл загружен')
                                setLoading(false)
                                uploadShot_POST(user.uid, targetDraft, draft)
                            } 
                        })
                    })
                    uploadedThumbnail(user.uid, targetDraft, opt.file as RcFile)
                    .then((link) => {
                        if (link) {
                            dispatch(setThumbnail({ link: link, width: '400', height: '300' }))
                            uploadShot_POST(user.uid, targetDraft, draft)
                            message.success('Обложка загружена')
                        } 
                    })
                    .catch(why => {
                        message.error('Что-то пошло не так и обложка не загрузилась')
                        message.loading('Пробуем снова загрузить')
                        setLoading(true)
                        uploadedThumbnail(user.uid, targetDraft, opt.file as RcFile)
                        .then((link) => {
                            if (link) {
                                dispatch(setThumbnail({ link: link, width: '400', height: '300' }))
                                uploadShot_POST(user.uid, targetDraft, draft)
                                message.success('Обложка загружена')
                            } 
                        })
                    })
                } else {
                        setLoading(true)
                        uploadedFile(user.uid, targetDraft, opt.file as RcFile)
                        .then((link) => {
                            if (link) {
                                message.success('Файл загружен')
                                const updatedBlocks = draft.blocks.map((_, blockIndex) => {
                                    if (blockIndex === index && _.type === 'image') {
                                        const updatedBlock: ImageBlock = {
                                            link: link,
                                            type: _.type
                                        }
                                        return updatedBlock
                                    } else if (blockIndex === index && _.type === 'video') {
                                        const updatedBlock: VideoBlock = {
                                            link: link,
                                            type: _.type
                                        }
                                        return updatedBlock
                                    } else return _
                                })
                                dispatch(setBlocks(updatedBlocks))
                            } 
                        })
                        .finally(() => setLoading(false))
                        .catch(why => message.error('Что-то пошло не так и изображение не загрузилось'))
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
                        setPredictedType(checkedFile.type)
                        const url = URL.createObjectURL(file)
                        setPreviewLink(url)
                        return checkedFile.link
                    } else return ''
                } else {
                    const checkedFile = uploadOnlyImages ? checkOnlyImageFile(user.uid, modals.draftId ? modals.draftId : generatedId, file) : checkFile(user.uid, modals.draftId ? modals.draftId : generatedId, file)
                    if (checkedFile) {
                        setPredictedType(checkedFile.type)
                        const url = URL.createObjectURL(file)
                        setPreviewLink(url)
                        const updatedBlocks = draft.blocks.map((_, blockIndex) => {
                            if (blockIndex === index) {
                                if (checkedFile.type === 'video') {
                                    const updatedBlock: VideoBlock = {
                                        link: '',
                                        type: checkedFile.type
                                    }
                                    return updatedBlock
                                } else {
                                    const updatedBlock: ImageBlock = {
                                        link: '',
                                        type: checkedFile.type
                                    }
                                    return updatedBlock
                                }
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
            const res = await fetch(`${getHost()}/files/file?link=${block.link}`, { method: "DELETE" })
            if (res.ok) {
                message.info('Файл был удалён')
                URL.revokeObjectURL(previewLink)
                setPreviewLink('')
                if (isRootBlock) {
                    dispatch(setRootBlock({ type: 'image', link: '' }))
                    if (draft.thumbnail) {
                        const thumbRes = await fetch(`${getHost()}/files/file?link=${draft.thumbnail.link}`, { method: "DELETE" })
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
    useDebounceEffect(() => {
        if (finalTouch && previewLink && block.link) {
            URL.revokeObjectURL(previewLink)
            setPreviewLink('')
        }
    },[finalTouch, previewLink, block.link], { wait: 2000 })
    // if (block.link && block.link !== '') {
    //     return (
    //         <div className="relative w-full h-fit !shrink-0">
    //             <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-3 h-fit">
    //                 <Button className='!px-2' loading={loading} onClick={deleteImage} icon={<BiTrashAlt size={15} className='inline-block mb-1' />}>Удалить</Button>
    //             </div>
    //             <MediaBlock asBlob={previewLink ? true : false} autoPlay
    //             link={previewLink ? previewLink : block.link} object='contain' quality={75} />
    //         </div>
    //     )
    // }
    return (
        <div className='relative w-full aspect-[4/3]'>
            {
                (previewLink || block.link) &&
                <div className={`relative w-full z-20 h-fit !shrink-0 transition-all ${loading ? 'brightness-50' : ''}`}>
                    <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-3 h-fit">
                        <Button className='!px-2' loading={loading} onClick={deleteImage}><BiTrashAlt size={15} className='inline-block mb-1' /></Button>
                    </div>
                    <MediaBlock asBlob={previewLink ? true : false} autoPlay forcedType={predictedType}
                    link={previewLink ? previewLink : block.link} object='contain' quality={75} />
                </div>
            }
            {
                !block.link &&
                <Dragger disabled={loading} className={`!aspect-[4/3] !shrink-0 ${previewLink ? '!absolute !left-0 !top-0 !opacity-0' : '!opacity-100'}`} {...props} defaultFileList={[]}>
                    <div className="flex flex-col items-center justify-center w-full max-w-lg gap-6 p-4 mx-auto md:p-0 h-fit">
                        <UploaderConditions isSubscriber={isSubscriber} onlyImages={uploadOnlyImages} />
                    </div>
                </Dragger>
            }
        </div>
    )
}

export default MediaUploader