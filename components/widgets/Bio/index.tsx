import { Button } from 'antd'
import React from 'react'
import About from './ui/About'
import Skills from './ui/Skills'

type Props = {
    preparedValue: boolean
}
const Bio = ({ preparedValue }: Props) => {
    return (
        <>
            <div className="flex flex-col w-full h-full gap-2 md:w-2/3">
                <About preparedValue={preparedValue} />
                <Skills preparedValue={preparedValue} />
            </div>
            <div className="flex flex-col w-full h-full md:w-1/3">
                <div className="flex flex-col w-full gap-2 h-fit">
                    <span className="font-medium text-neutral-200">Соц. сети</span>
                    <Button block>Добавить</Button>
                </div>
            </div>
        </>
    )
}

export default Bio