import { Button } from 'antd'
import React from 'react'

type Props = {
    title?: string
    children?: React.ReactNode
    buttonContent?: React.ReactNode
    isSelected?: boolean
    linkToPay?: string
}
const PricingColumn = ({ linkToPay, buttonContent, children, isSelected=false, title }: Props) => {
    return (
        <div className={`flex flex-col h-full gap-4 p-4 border md:w-96 w-full rounded-2xl ${isSelected ? 'scale-105 border-neutral-400' : 'border-neutral-700'}`}>
            <span className='text-2xl font-medium text-neutral-200'>{title}</span>
            <ul className="w-full h-fit">
                {children}
            </ul>
            <div className="w-full mt-auto">
            <Button href={linkToPay} block size='large' disabled={!isSelected} type='primary' className='!flex !h-12 !flex-col !items-center !justify-center'>
                { buttonContent }
            </Button>
            </div>
        </div>
    )
}

export default PricingColumn