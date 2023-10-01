'use client'
import { Button } from 'antd'
import React, { useState } from 'react'
import { BiPencil } from 'react-icons/bi'

type Props = {
    preparedValue: boolean
}
const About = ({ preparedValue }: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    return (
        <div className="flex flex-col w-full gap-2 h-fit">
            <div className="flex items-center justify-between w-full h-fit">
                <span className="font-medium text-neutral-200">Обо мне</span>
                { preparedValue && <Button onClick={() => setEditMode(!editMode)}><BiPencil /></Button> }
            </div>
            {
                editMode
                ? <div className="w-full h-32 bg-black border border-neutral-700 rounded-xl" />
                : <span className='text-sm text-neutral-300'>Нет описания</span>
            }
        </div>
    )
}

export default About