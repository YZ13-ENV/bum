import { useAppSelector } from '@/components/entities/store/store'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import ThumbnailUploader from '@/components/entities/Blocks/MediaBlock/ThumbnailUploader'

const PreviewSide = () => {
    const uploaderDraft = useAppSelector(state => state.uploader.draft)
    const uploader = useAppSelector(state => state.uploader)
    const [user] = useAuthState(auth)
    return (
        <div className="flex flex-col w-full gap-2 md:w-2/6 md:h-full h-fit">
            <span className='text-sm font-semibold text-neutral-200'>Предпросмотр обложки</span>
            <div className="relative w-full aspect-[4/3] flex flex-col gap-2 items-center justify-center rounded-xl bg-neutral-900">
                <ThumbnailUploader />
            </div>
        </div>
    )
}

export default PreviewSide