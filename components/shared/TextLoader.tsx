import React from 'react'
import { animated, useSpring } from '@react-spring/web'
import { easings } from '@react-spring/web'

type Props =  {
    delay?: number
    width?: string
}
const TextLoader = ({ delay=0, width='100%' }: Props) => {
    const LineTextSpring = useSpring({
        from: {
            opacity: 0,
            width: '0%',
        },
        to: {
            opacity: 1,
            width: width
        },
        config: {
            duration: 2500,
            easing: easings.easeInOutCubic
        },
        delay: delay
    })
    return (
        <animated.div style={{...LineTextSpring}} 
        className="h-6 shrink-0 rounded-xl bg-neutral-900" />
    )
}

export default TextLoader