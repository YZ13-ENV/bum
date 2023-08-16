'use client'
import { fileSizeAndType } from '@/helpers/checkFile'
import { getStorageHost } from '@/helpers/getHost'
import { auth, storage } from '@/utils/app'
import { useDebounceEffect } from 'ahooks'
import { Button, Input, Upload, UploadProps, message } from 'antd'
import { updateProfile } from 'firebase/auth'
import { ref, uploadBytes } from 'firebase/storage'
import Image from 'next/image'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiEdit, BiUser } from 'react-icons/bi'

const Edit = () => {
    const [user] = useAuthState(auth)
    const [userName, setUserName] = useState(user?.displayName || 'Пользователь')
    const [loading, setLoading] = useState<boolean>(false)
    const fileList: [] = []
    const updateUserName = async() => {
        if (user && userName !== '') {
            setLoading(true)
            await updateProfile(user, { displayName: userName })
            setLoading(false)
        }
    }
    const props: UploadProps = {
    name: 'file',
    multiple: false,
    fileList: fileList,
    action: async(file) => {
        if (user) {
            const typeOf = fileSizeAndType(file)
            if (typeOf === 'jpg' || typeOf === 'png') {
                setLoading(true)
                const fileToUpload = await file.arrayBuffer()
                const avatarRef = ref(storage, `users/${user.uid}/avatar.${typeOf}`)
                const snap = await uploadBytes(avatarRef, fileToUpload)
                const refForAPI = `${getStorageHost()}/files/profileImage?link=${snap.ref.fullPath}`
                await updateProfile(user, { photoURL: refForAPI })
                message.info('Фото профиля изменилось')
                setLoading(false)
                return refForAPI
            }
            return ''
        }
        return ''
    }};
    useDebounceEffect(() => {
        updateUserName()
    }, [userName, setUserName], { wait: 2000 })
    if (!user) return null
    return (
        <div className='flex flex-col items-start w-full h-full max-w-4xl gap-4 mx-auto md:gap-0 md:flex-row'>
            <div className="flex flex-col w-full gap-2 md:h-full h-fit md:w-2/3">
                <span className='text-2xl font-bold'>Редактирование данных</span>
                <span className='text-sm text-neutral-400'>Здесь вы можете изменить имя пользователя, и фото профиля</span>
                <div className="w-full py-2">
                    <Input disabled value={user.email || ''} size='large' />
                </div>
                <div className="w-full py-2">
                    <Input disabled={loading} placeholder='Имя пользователя' onChange={e => setUserName(e.target.value)} value={userName} size='large' />
                </div>
            </div>
            <div className="flex flex-col w-full h-full md:w-1/3">
                <div className="flex justify-center w-full h-fit">
                    <div className="relative w-fit h-fit">
                    {
                        user.photoURL
                        ? <Image src={user.photoURL} className='rounded-full' width={256} height={256} alt={user.uid} />
                        : <div className='flex items-center justify-center rounded-full w-9 h-9 bg-neutral-800'><BiUser size={18} /></div>
                    }
                    <div className="absolute bottom-0 right-0">
                        <Upload {...props}>
                            <Button loading={loading} icon={<BiEdit size={15} className='inline mb-0.5' />}>Изменить</Button>
                        </Upload>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit