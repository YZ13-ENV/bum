import { useAppSelector } from '@/components/entities/store/store'
import ShotCard from '@/components/entities/shot'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { DateTime } from 'luxon'

const PreviewSide = () => {
    const uploaderDraft = useAppSelector(state => state.uploader.draft)
    const uploader = useAppSelector(state => state.uploader)
    const [user] = useAuthState(auth)
    return (
        <div className="flex flex-col w-full gap-2 md:w-2/6 md:h-full h-fit">
            <span className='text-sm font-semibold text-neutral-200'>Предпросмотр обложки</span>
            <div className="grid w-full h-full preview_grid">
                <div className="w-full col-span-2">
                    <ShotCard shot={{ ...uploaderDraft, comments: [], needFeedback: false, tags: [], createdAt: DateTime.now().toSeconds(), likes: [],
                    doc_id: uploader.modals.draftId as string, isDraft: true, authorId: user?.uid || '',  views: [] }} />
                </div>
            </div>
        </div>
    )
}

export default PreviewSide