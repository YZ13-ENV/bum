'use client'
import { useRef, ElementRef, useLayoutEffect, useState } from 'react';

interface GenerateThumbnailProps {
    videoSrc: string;
}

const GeneratedThumbnail = ({ videoSrc }: GenerateThumbnailProps) => {
    const videoRef = useRef<ElementRef<'video'>>(null);
    const canvasRef = useRef<ElementRef<'canvas'>>(null);
    const [needPlay, setNeedPlay] = useState<boolean>(false)
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
        if (video) {
            if (needPlay) {
                video.play()
            } else {
                video.pause()
                video.currentTime = 0
            }
        }
    }, [videoRef.current, needPlay])
    useLayoutEffect(() => {
        const video = videoRef.current;
        const handleCanPlayThrough = () => paintThumbnail();
        if (video && needPlay) video.removeEventListener("canplaythrough", handleCanPlayThrough);
        if (video && !needPlay) {
            video.addEventListener("canplaythrough", handleCanPlayThrough);
            return () => {
                video.removeEventListener("canplaythrough", handleCanPlayThrough);
            }
        }
    }, [videoSrc, videoRef.current]);

    return (
        <>
            <video ref={videoRef} src={videoSrc} loop muted onMouseLeave={() => setNeedPlay(false)}
            className={`w-full h-full ${needPlay ? 'block z-10' : 'hidden'} aspect-[4/3]`} />
            <canvas ref={canvasRef} onMouseEnter={() => setNeedPlay(true)}
            className={`w-full h-full ${needPlay ? 'hidden' : ''} z-10 aspect-[4/3]`} />
        </>
    );
};

export default GeneratedThumbnail;

