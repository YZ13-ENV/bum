import { setDraftId, setRootBlock } from '@/components/entities/shotUploader/store'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { randomString } from '@/helpers/randomString'
import { auth, storage } from '@/utils/app'
import { Upload, UploadProps, message } from 'antd'
import { ref, uploadBytes } from 'firebase/storage'
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiArchive } from 'react-icons/bi'
import BlockImage from './BlockImage'

const { Dragger } = Upload
const RootBlock = () => {
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const rootBlock = useAppSelector(state => state.uploader.shot.rootBlock)
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        action: async(file) => {
            if (user) {
                const generatedDraftId = randomString(10)
                const refTo = ref(storage, `/users/${user.uid}/${generatedDraftId}/${file.name}`)
                const arrBuffer = await file.arrayBuffer()
                const uploaded =  await uploadBytes(refTo, arrBuffer)
                dispatch(setDraftId(generatedDraftId))
                dispatch(setRootBlock({ type: 'image', link: uploaded.ref.fullPath }))
                return uploaded.ref.fullPath
            } else return ''
        },
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
    };
    if (rootBlock.link !== '') {
        return (
            <div className="w-full h-[32rem]">
                <BlockImage imageLink={rootBlock.link} />
            </div>
        )
    }
    return (
        <Dragger className='!h-[32rem]' {...props}>
            <div className="flex flex-col items-center justify-center w-full max-w-sm gap-6 mx-auto h-fit">
                <div className="w-fit h-fit">
                    <BiArchive size={48} />
                </div>
                <div className="flex flex-col w-full gap-2 h-fit">
                    <p className="text-sm text-center text-neutral-300">Нажмите, или перетащите файл для внесение в работу</p>
                    <p className="text-sm text-center text-neutral-300">Максимальный каждого файла - 10MB, макс. файлов - 5</p>
                </div>
                <div className="grid w-full grid-cols-2 grid-rows-2 px-2 h-1/2">
                    <div className="flex items-start justify-start w-full h-full">
                        <li className='text-sm list-disc text-start text-neutral-400'>JPG, PNG</li>
                    </div>
                    <div className="flex items-start justify-start w-full h-full">
                        <li className='text-sm list-disc text-start text-neutral-400'>Загружайте, только то что принадлежит вам</li>
                    </div>
                    <div className="flex items-start justify-start w-full h-full">
                        <li className='text-sm list-disc text-start text-neutral-400'>Минимальное разрешение 900x500</li>
                    </div>
                </div>
            </div>
        </Dragger>
    )
}

export default RootBlock