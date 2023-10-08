'use client'
import { Switch } from "antd"
import { useState } from "react"
import { BiImage, BiVideo } from "react-icons/bi"

const ConstructorGallery = () => {
    const [turnOnSubscription, setTurnOnSubscription] = useState<boolean>(false)
    return (
        <div className='flex items-center justify-center gap-4 py-12 mx-auto shot_wrapper w-fit h-fit'>
            <div className="relative flex gap-4 w-fit h-fit">
                <div className="absolute right-0 flex items-center gap-2 -top-8">
                    <span className="text-sm text-neutral-400">Расширьте возможности</span>
                    <Switch checked={turnOnSubscription} onChange={e => setTurnOnSubscription(e)} />
                </div>
                <div className="relative aspect-[4/3] w-64 rounded-lg border flex items-center justify-center border-neutral-800 gap-2">
                    <span className="absolute text-sm top-4 right-4 text-neutral-400">{turnOnSubscription ? 'x10' :'x1'}</span>
                    <div className="p-3 border rounded-md border-neutral-800">
                        <BiImage size={30} />
                    </div>
                    <div className="p-3 border rounded-md border-neutral-800">
                        <BiVideo size={30} />
                    </div>
                </div>
                {
                    !turnOnSubscription &&
                    <div className="relative aspect-[4/3] w-64 rounded-lg border flex items-center justify-center border-neutral-800 gap-2">
                        <span className="absolute text-sm top-4 right-4 text-neutral-400">x4</span>
                        <div className="p-3 border rounded-md border-neutral-800">
                            <BiImage size={30} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ConstructorGallery