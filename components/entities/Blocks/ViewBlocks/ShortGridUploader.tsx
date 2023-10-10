import { auth } from '@/utils/app'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { ShotGridBlock } from '@/types'
import Dragger from 'antd/es/upload/Dragger'
import { Button, UploadProps, message } from 'antd'
import { BiTrashAlt } from 'react-icons/bi'
import MediaBlock from '../MediaBlock'
import { checkOnlyImageFile } from '@/helpers/checkFile'
import { randomString } from '@/helpers/randomString'
import { RcFile } from 'antd/es/upload'
import { uploadedFile } from '../MediaBlock/helper'
import { uploadShot_POST } from '@/helpers/shot'
import { setBlocks } from '../../uploader/draft.store'
import UploaderConditions from '../MediaBlock/UploaderConditions'

type Props = {
    block: ShotGridBlock
    index: number
}
const ShortGridUploader = ({ block, index }: Props) => {
    const dispatch = useAppDispatch()
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const [previewLink, setPreviewLink] = useState<string>('')
    const [predictedType, setPredictedType] = useState<'image' | 'video'>('image')
    const modals = useAppSelector(state => state.uploader.modals)
    const finalTouch = modals.finalTouchModal
    const draft = useAppSelector(state => state.uploader.draft)
    const [linkToPush, setLinkToPush] = useState<string | null>(null)
    useEffect(() => {
        if (linkToPush) {
            setLinkToPush(null)
        }
    },[linkToPush])
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        fileList: [],
        progress: undefined,
        customRequest: async(opt) => {
            if (opt.action !== '' && user) {
                const generatedId = randomString(30)
                const targetDraft = modals.draftId ? modals.draftId : generatedId
                setLoading(true)
                uploadedFile(user.uid, targetDraft, opt.file as RcFile)
                .then((link) => {
                    if (link) {
                        message.success('Файл загружен')
                        setLoading(false)
                        uploadShot_POST(user.uid, targetDraft, draft)
                        const updatedBlocks = draft.blocks.map((_, blockIndex) => {
                            if (blockIndex === index && _.type === 'shotGrid') {
                                const updatedBlock: ShotGridBlock = {
                                    ids: [..._.ids, link],
                                    title: _.title,
                                    type: _.type
                                }
                                return updatedBlock
                            } else return _
                        })
                        dispatch(setBlocks(updatedBlocks))
                    } 
                })
                .finally(() => setLoading(false))
            }
        },
        action: async(file) => {
            if (user) {
                const generatedId = randomString(20)
                const checkedFile = checkOnlyImageFile(user.uid, modals.draftId ? modals.draftId : generatedId, file)
                if (checkedFile) {
                    setPredictedType(checkedFile.type)
                    const url = URL.createObjectURL(file)
                    setPreviewLink(url)
                    return checkedFile.link
                }
            }
            return ''
        }
    }
    return (
        <div className='relative w-full aspect-[4/3]'>
            {
                (previewLink || linkToPush) &&
                <div className={`relative w-full z-20 h-fit !shrink-0 transition-all ${loading ? 'brightness-50' : ''}`}>
                    <MediaBlock asBlob={previewLink ? true : false} autoPlay forcedType={predictedType}
                    link={previewLink ? previewLink : linkToPush ? linkToPush : ''} object='contain' quality={75} />
                </div>
            }
            {
                !linkToPush &&
                <Dragger disabled={loading} className={`!aspect-[4/3] !shrink-0 ${previewLink ? '!absolute !left-0 !top-0 !opacity-0' : '!opacity-100'}`} {...props} defaultFileList={[]}>
                    <div className="flex flex-col items-center justify-center w-full max-w-lg gap-6 p-4 mx-auto md:p-0 h-fit">
                        <UploaderConditions onlyImages isSubscriber={false} customMaxFiles={4} />
                    </div>
                </Dragger>
            }
        </div>
    )
}

export default ShortGridUploader