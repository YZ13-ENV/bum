'use client'
import LoadedVideo from '@/components/shared/LoadedVideo';
import VideoAmbientLight from '@/components/widgets/AmbientLight/VideoAmbientLight';
import { fetchFile } from '@/helpers/fetchFile';
import { useTimeout } from 'ahooks';
import { useRef, ElementRef, useLayoutEffect, useState } from 'react';

interface GenerateThumbnailProps {
    thumbnailLink: string | null
    videoLink: string
}

const GeneratedThumbnail = ({ thumbnailLink, videoLink }: GenerateThumbnailProps) => {
    const videoRef = useRef<ElementRef<'video'>>(null);
    const canvasRef = useRef<ElementRef<'canvas'>>(null);
    const [playVideo, setPlayVideo] = useState<boolean>(false)
    const [delay, setDelay] = useState<number | undefined>(undefined)
    const clear = useTimeout(() => {
        setPlayVideo(true)
    }, delay);
    const paintThumbnail = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            if (context && videoRef.current) {
                videoRef.current.currentTime = 0;

                const scale = 1;
                context.scale(scale, scale);

                canvasRef.current.width = videoRef.current.videoWidth * scale;
                canvasRef.current.height = videoRef.current.videoHeight * scale;

                context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
            }
        }
    }
    useLayoutEffect(() => {
        const video = videoRef.current;
        const handleCanPlayThrough = () => paintThumbnail();
        if (video) video.removeEventListener("canplaythrough", handleCanPlayThrough);
        if (video) {
            video.addEventListener("canplaythrough", handleCanPlayThrough);
            return () => {
                video.removeEventListener("canplaythrough", handleCanPlayThrough);
            }
        }
    }, [thumbnailLink, videoLink, videoRef.current]);

    if (playVideo) return <div onMouseLeave={() => setPlayVideo(false)}><LoadedVideo link={fetchFile(videoLink)} autoPlay /></div>
    return (
        <>
            { delay !== undefined && <span className='absolute px-3 py-1 text-xs rounded-md bottom-14 right-2 bg-neutral-900 text-neutral-400'>Не убирайте указатель, предпросмотр начинается</span> }
            <video ref={videoRef} src={fetchFile(thumbnailLink ? thumbnailLink : videoLink)} 
            loop muted className='w-full h-full hidden aspect-[4/3] rounded-xl' />
            <canvas ref={canvasRef} onMouseEnter={() => setDelay(2000)} onMouseLeave={() => { clear(); setDelay(undefined)}}
             className='w-full h-full z-10 aspect-[4/3] rounded-xl' />
        </>
    );
};

export default GeneratedThumbnail;

