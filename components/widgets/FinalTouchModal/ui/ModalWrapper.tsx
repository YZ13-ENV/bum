'use client'
import { useAppDispatch } from '@/components/entities/store/store'
import { setFinalTouchModal } from '@/components/entities/uploader/modal.store'
import React from 'react'

type Props = {
    children: React.ReactNode
}
const ModalWrapper = ({ children }: Props) => {
    const dispatch = useAppDispatch()
    return (
        <div onClick={() => dispatch(setFinalTouchModal(false))} 
        className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-70'>
            {children}
        </div>
    )
}

export default ModalWrapper