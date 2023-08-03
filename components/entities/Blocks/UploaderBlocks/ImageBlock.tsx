import { ImageBlock } from '@/types'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, storage } from '@/utils/app'
import { Button, UploadProps, message } from 'antd'
import { deleteObject, ref, uploadBytes } from 'firebase/storage'
import { setBlocks } from '../../shotUploader/store'
import { BiArchive, BiTrashAlt } from 'react-icons/bi'
import BlockImage from '@/components/widgets/UploadBlockView/ui/BlockImage'
import Dragger from 'antd/es/upload/Dragger'
import { checkFile } from '@/helpers/checkFile'
type Props = {
    block: ImageBlock
    index: number
}
const ImageBlock = ({ block, index }: Props) => {
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const uploader = useAppSelector(state => state.uploader)
    const blocks = useAppSelector(state => state.uploader.shot.blocks)
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        action: async(file) => {
            if (user && uploader.draftId) {
                const checkedFile = checkFile(user.uid, uploader.draftId, file)
                if (checkedFile) {
                    const refTo = ref(storage, checkedFile)
                    const arrBuffer = await file.arrayBuffer()
                    const uploaded =  await uploadBytes(refTo, arrBuffer)
                    const updatedBlocks = blocks.map((_, blockIndex) => {
                        if (blockIndex === index) {
                            const updatedBlock: ImageBlock = {
                                link: uploaded.ref.fullPath,
                                type: 'image'
                            }
                            return updatedBlock
                        } else return _
                    })
                    dispatch(setBlocks(updatedBlocks))
                    return uploaded.ref.fullPath
                }
                return ''
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
    const deleteImageFromRootBlock = async() => {
        if (user && block.link !== '') {
            const imageRef = ref(storage, block.link)
            await deleteObject(imageRef)
            const updatedBlocks = blocks.map((_, blockIndex) => {
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
    if (block.link !== '') {
        return (
            <div className="relative w-full h-[32rem] !shrink-0">
                <div className="absolute top-0 left-0 z-10 flex items-center justify-end w-full p-3 h-fit">
                    <Button className='!px-2' onClick={deleteImageFromRootBlock}><BiTrashAlt size={17} /></Button>
                </div>
                <BlockImage imageLink={block.link} />
            </div>
        )
    }
    return (
        <Dragger className='!h-[32rem] !shrink-0' {...props}>
            <div className="flex flex-col items-center justify-center w-full max-w-sm gap-6 mx-auto h-fit">
                <div className="w-fit h-fit">
                    <BiArchive size={48} className='text-neutral-400' />
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

export default ImageBlock