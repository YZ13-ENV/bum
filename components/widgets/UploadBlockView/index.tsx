'use client'
import { UploadProps, message, Input } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React from 'react'
import { BiArchive } from 'react-icons/bi';

const UploadBlockView = () => {
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
    return (
        <div className="flex flex-col w-full h-full max-w-6xl gap-4 mx-auto shrink-0">
            <Input size='large' placeholder='Введите название для вашей работы' bordered={false} />
            <Dragger className='!h-96' {...props}>
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
                    </div>
                </div>
            </Dragger>
        </div>
    )
}

export default UploadBlockView