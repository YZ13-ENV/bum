import { Button, Space } from 'antd'
import React from 'react'
import { BiHeart, BiRightArrowAlt, BiShow } from 'react-icons/bi'

const ShotInfo = () => {
    return (
        <div className="absolute left-0 flex items-center justify-center w-full gap-2 p-2 transition-all delay-500 border-t -bottom-20 group-hover:bottom-0 h-fit rounded-b-2xl border-neutral-700 bg-neutral-800">
            <div className="flex flex-col w-2/3 h-full gap-2">
                <span className='w-full h-5 rounded-full bg-neutral-700'></span>
                <div className="flex items-center w-full h-full gap-2">
                    <div className="w-6 h-6 rounded-full shrink-0 bg-neutral-700"></div>
                    <span className='w-1/2 h-4 rounded-full bg-neutral-700'></span>
                </div>
            </div>
            <div className="flex flex-col w-1/3 h-full gap-1">
                <div className="flex items-center justify-end w-full h-1/2">
                    <Space.Compact block>
                        <Button block icon={<BiShow size={15} className='inline mb-1' />}>0</Button>
                        <Button block icon={<BiHeart size={15} className='inline mb-1' />}>0</Button>
                    </Space.Compact>
                </div>
                <div className="flex items-center justify-end w-full h-1/2">
                    <Button href='/shot/1' block>Посмотреть <BiRightArrowAlt size={17} className='inline mb-1'/></Button>
                </div>
            </div>
        </div>
    )
}

export default ShotInfo