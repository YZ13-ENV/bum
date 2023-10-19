'use client'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Button, message } from 'antd'
import MediaBlock from '.'
import { BiRefresh, BiTrashAlt } from 'react-icons/bi'
import { useDebounceEffect } from 'ahooks'
import Dragger from 'antd/es/upload/Dragger'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { getHost } from '@/helpers/getHost'
import { setThumbnail } from '../../uploader/draft.store'
import { RcFile } from 'antd/es/upload'
import { uploadShot_POST } from '@/helpers/shot'
import { UploadProps } from 'antd/lib'
import { checkFile, checkThumbnail } from '@/helpers/checkFile'
import { uploadedThumbnail } from './helper'


const ThumbnailUploader = () => {
    const [user] = useAuthState(auth)
    const thumbnail = useAppSelector(state => state.uploader.draft.thumbnail)
    const [previewLink, setPreviewLink] = useState<string>('')
    const [predictedType, setPredictedType] = useState<'image' | 'video'>('image')
    const [loading, setLoading] = useState<boolean>(false)
    const modals = useAppSelector(state => state.uploader.modals)
    const draftId = useAppSelector(state => state.uploader.modals.draftId)
    const draft = useAppSelector(state => state.uploader.draft)
    const [savedFile, setSavedFile] = useState<RcFile | null>(null)
    const finalTouch = modals.finalTouchModal
    const dispatch = useAppDispatch()
    const props: UploadProps = {
        name: 'file',
        disabled: draft.rootBlock.link === '',
        multiple: false,
        fileList: [],
        progress: undefined,
        customRequest: async(opt) => {
            if (opt.action !== '' && user && draftId) {
                try {
                    await uploadThumb(user.uid, draftId, opt.file as RcFile)
                } catch(e) {
                    setLoading(false)
                }
            }
        },
        action: async(file) => {
            if (user && draftId) {
                const checkedFile = checkThumbnail(user.uid, draftId, file)
                if (checkedFile) {
                    setSavedFile(file)
                    setPredictedType(checkedFile.type)
                    const url = URL.createObjectURL(file)
                    setPreviewLink(url)
                    return checkedFile.link
                } else return ''
            } return ''
        }
    }
    const uploadThumb = async(uid: string, draftId: string, file: RcFile) => {
        setLoading(true)
        const link = await uploadedThumbnail(uid, draftId, file as RcFile)
        if (link) {
            dispatch(setThumbnail({ link: link, width: '400', height: '300' }))
            uploadShot_POST(uid, draftId, draft)
            message.success('Обложка загружена')
            setLoading(false)
        } else setLoading(false)

    }
    const deleteImage = async() => {
        if (user && thumbnail && thumbnail.link !== '') {
            setLoading(true)
            const res = await fetch(`${getHost()}/files/file?link=${thumbnail.link}`, { method: "DELETE" })
            if (res.ok) {
                message.info('Файл был удалён')
                URL.revokeObjectURL(previewLink)
                setPreviewLink('')
                dispatch(setThumbnail(null))
            }
        }
    }
    useDebounceEffect(() => {
        if (finalTouch && previewLink && thumbnail) {
            URL.revokeObjectURL(previewLink)
            setPreviewLink('')
        }
    },[finalTouch, previewLink, thumbnail], { wait: 2000 })
    return (
        <div className={`relative w-full aspect-[4/3]`}>
            {
                (previewLink || thumbnail && thumbnail.link) &&
                <div className={`relative w-full z-20 h-fit !shrink-0 transition-all ${loading ? 'brightness-50' : ''}`}>
                    <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-3 h-fit">
                        {
                            (!loading && previewLink && !thumbnail && savedFile) &&
                            <Button className='!px-2' loading={loading} onClick={() => user && draftId && uploadThumb(user.uid, draftId, savedFile)}
                            ><BiRefresh size={15} className='inline-block mb-1' /></Button>
                        }
                        <Button className='!px-2' loading={loading} onClick={deleteImage}><BiTrashAlt size={15} className='inline-block mb-1' /></Button>
                    </div>
                    <MediaBlock asBlob={previewLink ? true : false} autoPlay forcedType={predictedType}
                    link={previewLink ? previewLink : thumbnail ? thumbnail.link : ''} object='contain' quality={75} />
                </div>
            }
            {
                !thumbnail?.link &&
                <Dragger disabled={loading} className={`!aspect-[4/3] !rounded-xl !shrink-0 ${previewLink ? '!absolute !left-0 !top-0 !opacity-0' : '!opacity-100'}`} {...props} defaultFileList={[]}>
                    <div className="flex flex-col items-center justify-center w-full max-w-lg gap-6 p-4 mx-auto h-fit">
                        <span className='text-sm font-medium text-center text-neutral-300'>Обложка</span>
                        <span className='text-xs text-center text-neutral-400'>
                            После загрузки файла в главный блок, обложка будет создана из главного блока,
                            но вы можете загрузить собственную, макс. 400x300 - 2MB.
                        </span>
                    </div>
                </Dragger>
            }
        </div>
    )
}

export default ThumbnailUploader