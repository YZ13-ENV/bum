'use client'
import { Button, Select } from 'antd'
import React, { useState } from 'react'
import { BiPencil } from 'react-icons/bi'

type Props = {
    preparedValue: boolean
}
const Skills = ({ preparedValue }: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    return (
        <div className="flex flex-col w-full gap-2 h-fit">
            <div className="flex items-center justify-between w-full h-fit">
                <span className="font-medium text-neutral-200">Навыки</span>
                { preparedValue && <Button onClick={() => setEditMode(!editMode)}><BiPencil /></Button> }
            </div>
            {
                editMode
                ? <Select mode="tags" />
                : <span className='text-sm text-neutral-300'>Навыки не указаны</span>
            }
        </div>
    )
}

export default Skills