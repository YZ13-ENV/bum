import { auth } from '@/utils/app'
import { Button, Select, Switch } from 'antd'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
    loading: boolean
    uploadDraft: () => void
    tags: string[]
    setTags: React.Dispatch<React.SetStateAction<string[]>>
    needFeedback: boolean
    setNeedFeedback: React.Dispatch<React.SetStateAction<boolean>>
}
const DraftConfig = ({ loading, uploadDraft, needFeedback, setNeedFeedback, setTags, tags }: Props) => {
    const [user] = useAuthState(auth)
    return (
        <div className="flex flex-col w-full h-full gap-8 md:w-4/6">
            <div className="flex flex-col w-full gap-2 h-fit">
                <span className='text-sm font-semibold text-neutral-200'>
                    Добавьте тэги для вашей работы <span className='text-xs text-neutral-400'>(Максимум 15 тэгов) {tags.length}/15</span>
                </span>
                <div className="flex flex-col w-full gap-1 h-fit">
                    <Select value={tags} onChange={e => e.length <= 15 ? setTags(e.map(tag => tag.toLowerCase())) : null} mode="tags" size='large' placeholder="Tags Mode" />
                </div>
            </div>
            <div className="flex items-center w-full gap-2 h-fit">
                <span className='text-sm font-semibold text-neutral-200'>Нужны комментарии?</span>
                <Switch defaultChecked checked={needFeedback} onChange={e => setNeedFeedback(e)} />
            </div>
            <div className="flex items-center justify-end w-full gap-2 mt-auto h-fit">
                {/* <Button size='large'>Оставить в черновиках</Button> */}
                <Button disabled={!user} loading={loading} onClick={uploadDraft} size='large' type='primary'>Опубликовать</Button>
            </div>
        </div>
    )
}

export default DraftConfig