'use client'
import { useAppSelector } from '@/components/entities/store/store'
import SubLabel from '@/components/shared/SubLabel'
import { useDebounceEffect } from 'ahooks'
import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { useLayoutEffect } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

const PaymentsPage = () => {
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const [isSubAccepted, setIsSubAccepted] = React.useState<boolean>(false)
    const [isSended, setIsSended] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    useLayoutEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false)
                setIsSended(true)
            }, 2000);
        }
    },[loading])
    useDebounceEffect(() => {
        if (isSub && isSended) {
            setIsSubAccepted(isSub)
            setIsSended(false)
        }
        if (!isSub && !isSended) {
            setIsSended(false)
            setIsSubAccepted(false)
        }
    },[isSub, isSended], { wait: 4000 })
    return (
        <div className='flex flex-col items-center justify-center w-full h-full px-4 shot_wrapper'>

            <div className="relative w-full h-[50vh] max-w-md max-h-full">
                { 
                    (isSended || isSubAccepted) && <section  className={`absolute  w-full z-[-1] max-w-md rounded-t-xl h-[50vh] ${!isSubAccepted ? 'animate-pulse blur-xl bg-neutral-700' : 'blur-3xl bg-neutral-50'} duration-1000 shrink-0 `} />
                }
                <section id='payment-form' className="w-full z-10 max-w-md rounded-3xl h-[50vh] gap-2 p-6 flex flex-col shrink-0 bg-black">
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                        <div className="flex items-center justify-center w-full h-full gap-2">
                            <Image src='/bum-full.svg' width={128} height={64} alt='logo' />
                            <SubLabel />
                        </div>
                        {
                            process.env.NODE_ENV === 'development' &&
                            <span onClick={() => {
                                setIsSended(false)
                                setIsSubAccepted(false)
                            }} className='text-sm text-neutral-400'>Отменить</span>
                        }
                        {
                            isSended && !isSubAccepted 
                            ?
                            <>
                                <div className="flex items-center justify-center w-full gap-2 h-fit">
                                    <BiLoaderAlt size={15} className='animate-spin' />
                                    <span className='text-sm text-neutral-400'>Ожидайте, это может занять несколько дней...</span>
                                </div>
                            </>
                            : (isSended || isSubAccepted)
                            ? <span className='text-sm text-neutral-400'>Вам доступны все <Link href='/membership' className='text-white'>возможности DM+</Link></span>
                            :
                            <div className="w-full mt-auto">
                                <Button loading={loading} onClick={() => setLoading(true)} type='primary' size='large' block> Хочу </Button>
                            </div>
                        }

                    </div>
                </section>
            </div>
        </div>
    )
}

export default PaymentsPage