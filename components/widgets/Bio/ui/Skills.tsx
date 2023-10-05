'use client'
import { Button, Select } from 'antd'
import React, { useState } from 'react'
import { BiPencil, BiSave } from 'react-icons/bi'

type Props = {
    skills: string[]
    setSkills: React.Dispatch<React.SetStateAction<string[]>>
    preparedValue: boolean
}
const Skills = ({ preparedValue, skills, setSkills }: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    return (
        <div className="flex flex-col w-full gap-2 h-fit">
            <div className="flex items-center justify-between w-full h-fit">
                <span className="font-medium text-neutral-200">Навыки</span>
                { preparedValue && <Button onClick={() => setEditMode(!editMode)}>{editMode ? <BiSave /> : <BiPencil />}</Button> }
            </div>
            <div className="flex flex-wrap w-full gap-1 h-fit">
                {
                    editMode
                    ? <Select mode="tags" value={skills} onChange={(val) => setSkills(val)} />
                    : 
                    skills.length !== 0 
                    ? skills.map(skill => <span key={skill} className='px-3 py-1 text-sm border rounded-md w-fit bg-neutral-900 border-neutral-800'>{skill}</span>) 
                    : <span className='text-sm text-neutral-300'>Навыки не указаны</span>
                        
                }
            </div>
        </div>
    )
}

export default Skills