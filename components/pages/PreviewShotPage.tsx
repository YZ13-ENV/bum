'use client'
import { DocShotData, ShortUserData } from '@/types'
import { Button } from 'antd'
import React, { useLayoutEffect } from 'react'
import { BiExpandAlt, BiX } from 'react-icons/bi'
import MediaBlock from '../entities/Blocks/MediaBlock'
import { useRouter, useSearchParams } from 'next/navigation'
import ShortGridBlock from '../entities/Blocks/ViewBlocks/ShortGridBlock'
import TextBlock from '../entities/Blocks/ViewBlocks/TextBlock'
import FollowButton from '../widgets/UserProfileTabs/ui/FollowButton'
import Link from 'next/link'
import Avatar from '../shared/Avatar'
import CommentSection from '../widgets/ShotPageFooter/ui/CommentSection'
import { DateTime } from 'luxon'
import { largeNumber } from '@/helpers/largeNumbers'

type Props = {
    shot: DocShotData | null
    user: ShortUserData | null
    needConfetti?: boolean
}
const PreviewShotPage = ({ shot, user, needConfetti=false }: Props) => {
    const router = useRouter()
    const searchQueries = useSearchParams()
    const s = searchQueries.get('s')
    const jumpBack = () => {
        const root = document.getElementById("root")
        root?.classList.remove('overflow-hidden')
        router.back()
    }
    useLayoutEffect(() => {
        const root = document.getElementById("root")
        root?.classList.add('overflow-hidden')
    }, [s])
    if (!shot || !user) return null
    return (
        <div className='flex items-start w-full min-h-full gap-4 h-fit shrink-0'>
            <div className="flex flex-col w-2/3 gap-4 pb-4 pr-2 overflow-x-visible h-fit shrink-0">
                <MediaBlock link={shot.rootBlock.link} autoPlay object='contain' withAmbiLight={user.isSubscriber || false} />
                {/* <div className="w-full aspect-[4/3] rounded-xl bg-neutral-900 shrink-0" /> */}
                <div className="flex flex-col w-full h-full gap-4 px-8 shrink-0">
                    {
                        shot.blocks.map((block, index) => {
                            if (block.type === 'image' || block.type === 'video') {
                                return <MediaBlock key={`block#${index}`} link={block.link} autoPlay />
                            }
                            if (block.type === 'shotGrid') {
                                return <ShortGridBlock key={`block#${index}`} block={block} />
                            }
                            if (block.type === 'text') {
                                return (
                                    <TextBlock key={`block#${index}`} enableMdSyntax={shot.enableMdSyntax || false} block={block} />
                                )
                            }
                            return null
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col w-1/3 h-full">
                <div className="sticky top-0 z-20 flex flex-col w-full gap-4 h-fit">
                    <div className="flex items-center justify-end w-full gap-2 h-fit">
                        <Button onClick={() => router.refresh()} type='text' className='!px-2'><BiExpandAlt size={18} className='text-neutral-400' /></Button>
                        <Button onClick={jumpBack} type='text' className='!px-2'><BiX size={21} className='text-neutral-400' /></Button>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-fit">
                        <h1 className='text-xl font-semibold text-neutral-200'>{shot.title}</h1>
                    </div>
                    <div className="flex items-center justify-between w-full gap-2 h-fit">
                        <Link href={`/${shot.authorId}`} className="flex items-center gap-2 w-fit h-fit">
                            <Avatar src={user.photoUrl} size={36} direction='right' isSub={user.isSubscriber || false} />
                            <span className='text-lg font-bold text-neutral-200'>{user.displayName.length <= 30 ? user.displayName : user.displayName.substring(0, 30) + '...' || 'Пользователь'}</span>
                        </Link>
                        <FollowButton profileUID={shot.authorId} />
                    </div>
                    <div className="flex flex-col w-full gap-2 p-2 h-fit rounded-xl bg-neutral-900">
                        <div className="flex items-center justify-between w-full h-fit">
                            <div className="flex items-center gap-2 w-fit h-fit">
                                <span className='text-sm text-neutral-300'>{largeNumber(shot.views.length)} просмотров</span>
                                <span className='text-sm text-neutral-300'>{DateTime.fromSeconds(shot.createdAt).setLocale('ru').toLocaleString(DateTime.DATE_MED)}</span>
                            </div>
                            <div className="flex items-center w-fit h-fit">
                            </div>
                        </div>
                        {
                            shot.tags.length !== 0 &&
                            <div className="inline-flex flex-wrap w-full gap-1 h-fit">
                                {
                                    shot.tags.map((tag, index) => <Link key={tag + index} href={`/tags/${tag}`}
                                        className='px-2 py-0.5 text-xs rounded-full border border-neutral-700 text-neutral-300 bg-neutral-800'>{tag}</Link>
                                    )
                                }
                            </div>
                        }
                    </div>
                    <div className="flex flex-col w-full h-full gap-2 px-2">
                        <CommentSection shot={shot} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewShotPage