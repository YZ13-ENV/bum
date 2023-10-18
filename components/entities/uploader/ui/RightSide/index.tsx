import { Select, Switch } from 'antd'
import React from 'react'

const RightSide = () => {
    return (
        <>
            <div className="w-full aspect-[4/3] rounded-xl bg-neutral-900">
                <span>Обложка</span>
            </div>
            <Select mode="tags" size='large' placeholder="По каким тэгам можно найти" />
            <div className="flex items-center w-full gap-2 h-fit">
                <Switch defaultChecked />
                <span className='text-sm font-semibold text-neutral-300'>Нужны комментарии?</span>
            </div>
            <div className="flex items-center w-full gap-2 h-fit">
                <Switch defaultChecked />
                <span className='text-sm font-semibold text-neutral-300'>Включить MarkDown? <sup>Beta</sup></span>
            </div>
        </>
    )
}

export default RightSide