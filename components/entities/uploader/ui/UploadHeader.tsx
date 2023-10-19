'use client'
import { Button } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector, useAppDispatch } from '../../store/store'
import { BiFileBlank, BiRightArrowAlt } from 'react-icons/bi'
import { setFinalTouchModal } from '../modal.store'
// import BlocksGrid from './BlocksGrid'
import Link from 'next/link'
import Image from 'next/image'
const UploadHeader = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const draft = useAppSelector(state => state.uploader.draft)
    const draftId = useAppSelector(state => state.uploader.modals.draftId)
    const dispatch = useAppDispatch()
    return (
        <div className="flex items-center justify-between w-full gap-2 p-2 h-14">
            <div className="flex flex-row items-center gap-4 px-2 shrink-0 w-fit h-fit">
                <Link href='/'><Image src={'/bum.svg'} width={32} className='shrink-0' height={32} alt='bum-logo' /></Link>
                <div className="flex items-center gap-2 px-3 py-2 mx-auto border rounded-lg w-fit h-fit bg-neutral-900 border-neutral-700">
                    <BiFileBlank size={19} className='mb-0.5' />
                    <span className='text-sm text-neutral-300'>Черновики</span>
                    <span className='text-sm text-neutral-300'>/</span>
                    <span className='text-sm text-neutral-300'>{draftId || 'Пустой черновик'}</span>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2 px-2 w-fit shrink-0 h-fit">
                <Button disabled={draft.rootBlock.link === '' || draft.title === ''} size='large'
                onClick={() => dispatch(setFinalTouchModal(true))} type='primary'>{isTabletOrMobile ? <BiRightArrowAlt size={17} /> :'Продолжить'}</Button>
            </div>
        </div>
    )
}

export default UploadHeader