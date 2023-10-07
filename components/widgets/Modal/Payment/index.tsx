import { Button, Input } from 'antd'
import React from 'react'
import CardNumber from './ui/CardNumber'
import CardExpire from './ui/CardExpire'
import CardCVV from './ui/CardCVV'

const PaymentModal = () => {
    return (
        <div className='absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black bg-opacity-60'>
            <div className="flex flex-col w-full max-w-md gap-8 p-4 border h-fit border-neutral-800 rounded-xl bg-neutral-900">
                <div className="flex flex-col w-full gap-2 h-fit">
                    <h2 className='text-3xl font-semibold text-neutral-200'>Привязка новой карты</h2>
                    <span className='text-sm text-neutral-400'>Здесь вы можете указать платежные данные для оплаты.</span>
                </div>
                <div className="flex flex-col w-full gap-4 my-auto h-fit">
                    <CardNumber />
                    <div className="flex items-center w-full gap-2 h-fit">
                        <CardExpire />
                        <CardCVV />
                    </div>
                </div>
                <div className="flex items-center w-full gap-2">
                    <Button block size='large' type='text'>Вернуться</Button>
                    <Button block size='large' type='primary'>Продолжить</Button>
                </div>
            </div>
        </div>
    )
}

export default PaymentModal