import { checkFile } from '@/helpers/checkFile'
import { randomString } from '@/helpers/randomString'
import { auth, storage } from '@/utils/app'
import { Upload, UploadProps } from 'antd'
import { ref, uploadBytes } from 'firebase/storage'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { setDraftId, setRootBlock } from '../../uploader/store'
import { useAppDispatch, useAppSelector } from '../../store/store'
import UploaderIcons from '@/components/shared/ui/Animated/UploaderIcons'

const { Dragger } = Upload
const MediaUploadBlock = () => {
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const uploader = useAppSelector(state => state.uploader)
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        action: async(file) => {
            if (user) {
                const generatedId = randomString(20)
                const checkedFile = checkFile(user.uid, uploader.draftId ? uploader.draftId : generatedId, file)
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
            } else return ''
        }
    };
    return (
        <Dragger className='!h-[32rem] !shrink-0' {...props}>
            <div className="flex flex-col items-center justify-center w-full max-w-lg gap-6 mx-auto h-fit">
                <UploaderIcons />
                <div className="flex flex-col w-full gap-2 h-fit">
                    <p className="text-base font-semibold text-center text-neutral-200">Нажмите, или перетащите файл для внесение в работу</p>
                    <p className="text-sm text-center text-neutral-400">Максимальный размер каждого изображения - 10MB, макс. файлов - 5</p>
                    <p className="text-sm text-center text-neutral-400">Максимальный размер видео - 20MB</p>
                </div>
                <div className="grid w-full grid-cols-2 grid-rows-2 px-2 h-1/2">
                    <div className="flex items-start justify-start w-full h-full">
                        <li className='text-sm list-disc text-start text-neutral-400'>Изображения (.jpg, .png)</li>
                    </div>
                    <div className="flex items-start justify-start w-full h-full">
                        <li className='text-sm list-disc text-start text-neutral-400'>Видео (.mp4)</li>
                    </div>
                    <div className="flex items-start justify-start w-full h-full">
                        <li className='text-sm list-disc text-start text-neutral-400'>Анимированные GIF (.gif)</li>
                    </div>
                    <div className="flex items-start justify-start w-full h-full">
                        <li className='text-sm list-disc text-start text-neutral-400'>Загружайте, только то что принадлежит вам</li>
                    </div>
                </div>
            </div>
        </Dragger>
    )
}

export default MediaUploadBlock