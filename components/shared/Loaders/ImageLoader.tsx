'use client'
import { animated, useSpring } from '@react-spring/web'
import { easings } from '@react-spring/web'

type Props = {
    delay?: number
}
const ImageLoader = ({ delay=0 }: Props) => {
    const ImageSpring = useSpring({
        from: {
            opacity: 0,
            height: '0rem',
        },
        to: {
            opacity: 1,
            height: '24rem'
        },
        config: {
            duration: 2000,
            easing: easings.easeInOutCubic
        },
        delay: delay
    })
    return (
        <animated.div style={{...ImageSpring}} 
        className="flex items-center justify-center w-full shrink-0 rounded-xl bg-neutral-900" />
    )
}

export default ImageLoader