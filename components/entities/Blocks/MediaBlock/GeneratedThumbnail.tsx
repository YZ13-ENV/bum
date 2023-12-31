'use client'
import LoadedVideo from '@/components/shared/LoadedVideo';
import { fetchFile } from '@/helpers/fetchFile';
import { useTimeout } from 'ahooks';
import { useRef, ElementRef, useState, useLayoutEffect, memo } from 'react';

interface GenerateThumbnailProps {
    thumbnailLink: string | null
    hideTooltip?: boolean
    videoLink: string
}

const GeneratedThumbnail = ({ thumbnailLink, videoLink, hideTooltip=false }: GenerateThumbnailProps) => {
    const videoRef = useRef<ElementRef<'video'>>(null);
    const canvasRef = useRef<ElementRef<'canvas'>>(null);
    const [playVideo, setPlayVideo] = useState<boolean>(false)
    const [delay, setDelay] = useState<number | undefined>(undefined)
    const clear = useTimeout(() => {
        setPlayVideo(true)
    }, delay);
    const paintThumbnail = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext("2d", { alpha: false });
            if (context) {
                canvasRef.current.width = canvasRef.current.clientWidth * 1.5;
                canvasRef.current.height = canvasRef.current.clientHeight * 1.5;
                context.imageSmoothingEnabled = true;
                const width = canvasRef.current.width
                const height = canvasRef.current.height
                context.drawImage(videoRef.current, 0, 0, width, height);
            }
        }
    }
    useLayoutEffect(() => {
        if ((videoRef.current || canvasRef.current) && !playVideo) {
            if (videoRef.current) {
                videoRef.current.addEventListener('load', paintThumbnail)
                videoRef.current.addEventListener('canplaythrough', paintThumbnail)
                videoRef.current.addEventListener('loadeddata', paintThumbnail)
                videoRef.current.addEventListener('loadedmetadata', paintThumbnail)
            }
        } 
    },[videoRef, canvasRef, playVideo])
    if (playVideo) return <div onMouseLeave={() => {setPlayVideo(false); setDelay(undefined)}}><LoadedVideo link={process.env.NODE_ENV === 'development' ? '/dev-video.mp4' :fetchFile(videoLink)} autoPlay /></div>
    return (
        <>
            {  hideTooltip ? null : delay !== undefined && <span onMouseEnter={() => setDelay(2000)}
            className='absolute px-3 py-1 text-xs rounded-md bottom-14 right-2 bg-neutral-900 text-neutral-400'>Не убирайте указатель, предпросмотр начинается</span> }
            <video ref={videoRef} preload='metadata' loop muted className='w-full h-full hidden aspect-[4/3] rounded-xl'>
                <source src={(process.env.NODE_ENV === 'development' ? '/dev-video.mp4' : fetchFile(thumbnailLink ? thumbnailLink : videoLink)) + '#t=0.5'} />
            </video>
            <canvas ref={canvasRef} onMouseEnter={() => setDelay(2000)} onMouseLeave={() => { clear(); setDelay(undefined)}}
            className='w-full h-full z-10 aspect-[4/3] rounded-xl' />
        </>
    );
};

export default memo(GeneratedThumbnail);

