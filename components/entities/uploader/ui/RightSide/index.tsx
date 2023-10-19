'use client'
import ThumbnailUploader from '@/components/entities/Blocks/MediaBlock/ThumbnailUploader'
import BlocksGrid from '../BlocksGrid'

const RightSide = () => {
    return (
        <>
            <div className="relative w-full aspect-[4/3] flex flex-col gap-2 items-center justify-center rounded-xl bg-neutral-900">
                <ThumbnailUploader />
            </div>
            <BlocksGrid />
        </>
    )
}

export default RightSide