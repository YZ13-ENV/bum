'use client'
import React, { useState } from 'react'
import ImagePreview from './ui/ImagePreview'
import { Segmented } from 'antd'
import VideoPreview from './ui/VideoPreview'

const PreviewGallery = () => {
    const [tab, setTab] = useState<string>('Картинка')
    const [turnAmbient, setTurnAmbient] = useState<boolean>(false)
    return (
        <div className="flex flex-col w-full max-w-5xl gap-4 h-fit aspect-[4/3] items-center justify-center">
            <div className="w-full max-w-3xl">
                {
                    tab === 'Видео'
                    ? <VideoPreview turnAmbient={turnAmbient} setTurnAmbient={setTurnAmbient} />
                    : <ImagePreview turnAmbient={turnAmbient} setTurnAmbient={setTurnAmbient} />
                }
            </div>
            <div className="w-full max-w-md shrink-0">
                <Segmented block default size='large' defaultValue='Картинка' value={tab} onChange={e => setTab(e.toString())} options={['Картинка', 'Видео']} />
            </div>
        </div>
    )
}

export default PreviewGallery