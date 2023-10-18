'use client'
import { Button } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { useAppSelector, useAppDispatch } from '../../store/store'
import { BiRightArrowAlt } from 'react-icons/bi'
import { setFinalTouchModal } from '../modal.store'
import BlocksGrid from './BlocksGrid'
import Link from 'next/link'
import Image from 'next/image'
const UploadHeader = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const draft = useAppSelector(state => state.uploader.draft)
    const dispatch = useAppDispatch()
    return (
        <div className="flex items-center justify-between w-full gap-2 p-2 h-14">
            <div className="flex flex-row-reverse items-center gap-2 px-2 md:flex-row w-fit h-fit">
                <Link href='/'><Image src={'/bum.svg'} width={32} height={32} alt='bum-logo' />
                </Link>
            </div>
            <div className="flex items-center justify-center w-full h-full max-w-6xl gap-2 shrink-0">
                <BlocksGrid />
            </div>
            <div className="flex flex-row-reverse items-center gap-2 px-2 md:flex-row w-fit h-fit">
                <Button disabled={draft.rootBlock.link === '' || draft.title === ''} 
                onClick={() => dispatch(setFinalTouchModal(true))} type='primary'>{isTabletOrMobile ? <BiRightArrowAlt size={17} /> :'Продолжить'}</Button>
            </div>
        </div>
    )
}

export default UploadHeader