import Image from 'next/image'
import { v4 } from 'uuid'
import SubLabel from './SubLabel'

type Props = {
    src: string | null
    size: number
    isSub?: boolean
    direction?: 'left' | 'right'
}
const Avatar = ({ size, src, isSub, direction='left' }: Props) => {
    if (!isSub) {
        return <Image src={src ? src : '/EmptyUser.svg'} className="rounded-full shrink-0" width={size} height={size} alt={v4()} />
    }
    return (
        <div className={`flex items-center ${direction === 'left' ? 'flex-row' : 'flex-row-reverse'} h-full gap-2 w-fit`}>
            <SubLabel />
            <Image src={src ? src : '/EmptyUser.svg'} className={`rounded-full shrink-0 ${isSub && 'border-2 border-white'}`} width={size} height={size} alt={v4()} />
        </div>
    )
}

export default Avatar