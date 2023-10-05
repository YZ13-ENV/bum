'use client'
import TextArea from '@/components/shared/TextArea'
import { Button } from 'antd'
import React, { useState } from 'react'
import { BiPencil, BiSave } from 'react-icons/bi'

type Props = {
    about: string
    setAbout: React.Dispatch<React.SetStateAction<string>>
    preparedValue: boolean
}
const About = ({ preparedValue, about, setAbout }: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    return (
        <div className="flex flex-col w-full gap-2 h-fit">
            <div className="flex items-center justify-between w-full h-fit">
                <span className="font-medium text-neutral-200">Обо мне</span>
                { preparedValue && <Button onClick={() => setEditMode(!editMode)}>{editMode ? <BiSave /> : <BiPencil />}</Button> }
            </div>
            {
                editMode
                ? <TextArea className='min-h-[10rem] border p-4 text-sm rounded-lg border-neutral-700' 
                placeholder='Расскажите о себе' text={about} setText={text => setAbout(text)} />
                : <span className='text-sm text-neutral-300'>{about || 'Нет описания'}</span>
            }
        </div>
    )
}

export default About