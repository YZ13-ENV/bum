'use client'
import { setTitle } from '@/components/entities/shotUploader/store';
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store';
import { Input } from 'antd';
import React from 'react'
import RootBlock from './ui/RootBlock';
import UploaderWatcher from '@/components/entities/shotUploader/watcher';

/*
    В момент когда мы закидываем картинку в root block
    в bucket закидывается картинка, а в бд создается 
    документ с теплейтом как драфт (т.е. он не будет отображен для всех) 
    и уже загруженной в root block картинкой.
    ---
    А когда пользователь удаляет свой драфт, то загруженная картинка 
    как и документ стирается с бд
*/

const UploadBlockView = () => {
    const title = useAppSelector(state => state.uploader.shot.title)
    const dispatch = useAppDispatch()
    return (
        <>
        <UploaderWatcher />
        <div className="flex flex-col w-full h-full max-w-4xl gap-4 px-4 py-4 mx-auto md:px-0 md:py-4">
            <Input size='large' className='!text-xl !font-semibold'
            value={title} onChange={e => dispatch(setTitle(e.target.value))}
            placeholder='Введите название для вашей работы' bordered={false} />
            <RootBlock />
        </div>
        </>
    )
}

export default UploadBlockView