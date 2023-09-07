'use client'
import { useSize } from 'ahooks'
import React from 'react'
import Confetti from 'react-confetti'
type Props = {
    views: number
}
const ConfettiForNewShot = ({ views }: Props) => {
    const size = useSize(document.querySelector('body'));
    if (views >= 1) return null
    return (
        <Confetti 
            width={size?.width}
            height={size?.height}
            confettiSource={{
            w: size?.width || 1920,
            h: 10,
            x: 0,
            y: 0,
            }} 
            tweenDuration={25000}
            numberOfPieces={750}
            recycle={false}
        />
    )
}

export default ConfettiForNewShot