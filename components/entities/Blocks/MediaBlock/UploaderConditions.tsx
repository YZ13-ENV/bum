import React from 'react'

type Props = {
    onlyImages: boolean
    isSubscriber: boolean
    customMaxFiles?: number
}
const UploaderConditions = ({ isSubscriber, onlyImages, customMaxFiles }: Props) => {
    return (
        <>
            <div className="flex flex-col w-full gap-2 h-fit">
                <p className="text-sm font-semibold text-center md:text-base text-neutral-200">Нажмите, или перетащите файл для внесение в работу</p>
                <p className="text-xs text-center md:text-sm text-neutral-400"
                >Максимальный размер каждого изображения - 10MB, макс. файлов - {customMaxFiles ? customMaxFiles : isSubscriber ? 10 : 5}</p>
                { !onlyImages && <p className="text-xs text-center md:text-sm text-neutral-400">Максимальный размер видео - 20MB</p> }
            </div>
            <div className="grid w-full grid-cols-2 grid-rows-2 px-2 h-1/2">
                <div className="flex items-start justify-start w-full h-full">
                    <li className='text-xs list-disc md:text-sm text-start text-neutral-400'>Изображения (.jpg, .png)</li>
                </div>
                {
                    !onlyImages &&
                    <>
                        <div className="flex items-start justify-start w-full h-full">
                            <li className='text-xs list-disc md:text-sm text-start text-neutral-400'>Видео (.mp4)</li>
                        </div>
                        <div className="flex items-start justify-start w-full h-full">
                            <li className='text-xs list-disc md:text-sm text-start text-neutral-400'>Анимированные GIF (.gif)</li>
                        </div>
                    </>
                }
                <div className="flex items-start justify-start w-full h-full">
                    <li className='text-xs list-disc md:text-sm text-start text-neutral-400'>Загружайте, только то что принадлежит вам</li>
                </div>
            </div>
        </>
    )
}

export default UploaderConditions