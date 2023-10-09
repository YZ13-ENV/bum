'use client'
import MediaBlock from '@/components/entities/Blocks/MediaBlock'
import AmbientSwitcher from './AmbientSwitcher'

type Props = {
    turnAmbient: boolean
    setTurnAmbient: React.Dispatch<React.SetStateAction<boolean>>
}
const ImagePreview = ({ setTurnAmbient, turnAmbient }: Props) => {
    
    return (
        <div className="relative flex flex-col w-full max-w-sm mx-auto my-10 md:max-w-2xl lg:max-w-4xl bg-neutral-800 rounded-xl shrink-0">
            <AmbientSwitcher setTurnAmbient={setTurnAmbient} turnAmbient={turnAmbient} />
            <MediaBlock link='/bum-plus-preview.png' asBlob object='contain' withAmbiLight={turnAmbient} />
        </div>
    )
}

export default ImagePreview