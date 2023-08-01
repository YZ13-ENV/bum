'use client'
import { Button, Input, Upload, UploadProps, message } from 'antd'
import React from 'react'
import { BiArchive, BiDroplet, BiInfoCircle, BiLock, BiPlus } from 'react-icons/bi';

const { Dragger } = Upload
const UploadShotPage = () => {
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
        <section className='flex flex-col w-full h-full'>
            <div className="flex items-center justify-between w-full h-16 gap-2 px-4">
                <Button href='/'>Вернуться</Button>
                <div className="flex items-center gap-2 w-fit h-fit">
                    <Button>Сохранить в черновик</Button>
                    <Button type='primary'>Продолжить</Button>
                </div>
            </div>
            <div className="flex w-full h-full">
                <div className="flex flex-col w-full h-full gap-2 p-4">
                    <div className="flex items-center w-full gap-2 h-fit">
                        <BiInfoCircle size={16} className='shrink-0' />
                        <span className='text-xs text-neutral-300'>Картинка, которую вы загрузите в первый блок, 
                        будет использоваться как обложка для работы, если вы не загрузите обложку</span>
                    </div>
                    <div className="flex items-center w-full gap-2 h-fit">
                        <BiInfoCircle size={16} className='shrink-0' />
                        <span className='text-xs text-neutral-300'>Вы можете перемещать между собой блоки, кроме первого блока с изображением</span>
                    </div>
                    <div className="flex items-center w-full gap-2 h-fit">
                        <BiInfoCircle size={16} className='shrink-0' />
                        <span className='text-xs text-neutral-300'>Если вы хотите продолжить публикацию позже, вы можете сохранить в черновики, и продолжить позднее</span>
                    </div>
                    <hr className='border-neutral-700' />
                    <div className="flex flex-col w-full h-full gap-2">
                        <span className='font-semibold text-neutral-200'>Ваши работы</span>
                        <div className="flex flex-col w-full h-full gap-4">
                            <div className="w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950"></div>
                            <div className="w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950"></div>
                            <div className="w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950"></div>
                        </div>
                    </div>
                </div>
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
                <div className="flex flex-col w-full h-full gap-2 p-4">
                    <div className="flex flex-col w-full h-full gap-2">
                        <div className="flex items-center justify-between w-full gap-2 h-fit">
                            <span className='font-semibold text-neutral-200'>Блоки</span>
                            <Button className='!px-2'><BiPlus size={17} /></Button>
                        </div>
                        <div className="flex flex-col w-full h-full gap-2">
                            <div className="flex flex-col items-center justify-center w-full h-56 border rounded-xl border-neutral-800 bg-neutral-950">
                                <BiLock size={24} className='text-neutral-400' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default UploadShotPage