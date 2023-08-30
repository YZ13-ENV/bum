import { useAppDispatch } from '@/components/entities/store/store'
import { setFinalTouchModal } from '@/components/entities/uploader/modal.store'
import { Button } from 'antd'
import React from 'react'
import { BiX } from 'react-icons/bi'

const ModalHeader = () => {
    const dispatch = useAppDispatch()
    return (
        <div className="flex items-center justify-between w-full h-fit">
            <span className='text-xl font-bold text-neutral-200'>Финальные штрихи</span>
            <Button onClick={() => dispatch(setFinalTouchModal(false))}  type='text'><BiX size={21} /></Button>
        </div>
    )
}

export default ModalHeader