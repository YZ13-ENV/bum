'use client'
import { useRef, ElementRef, useLayoutEffect, useState } from 'react';

interface GenerateThumbnailProps {
    videoSrc: string;
}

const GeneratedThumbnail = ({ videoSrc }: GenerateThumbnailProps) => {
    const videoRef = useRef<ElementRef<'video'>>(null);
    const canvasRef = useRef<ElementRef<'canvas'>>(null);
    const paintThumbnail = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            if (context && videoRef.current) {
                videoRef.current.currentTime = 0;
                // videoRef.current.play();

                const scale = 1;
                context.scale(scale, scale);

                canvasRef.current.width = videoRef.current.videoWidth * scale;
                canvasRef.current.height = videoRef.current.videoHeight * scale;

                context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
                // videoRef.current.pause();
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
    }, [videoSrc, videoRef.current]);

    return (
        <>
            <video ref={videoRef} src={videoSrc} loop muted className='w-full h-full hidden aspect-[4/3]' />
            <canvas ref={canvasRef} className='w-full h-full z-10 aspect-[4/3]' />
        </>
    );
};

export default GeneratedThumbnail;

