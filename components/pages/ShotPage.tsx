import { DocShotData, ShortUserData } from '@/types'
import Link from 'next/link'
import React, { Suspense } from 'react'
import MediaBlock from '../entities/Blocks/MediaBlock'
import TextBlock from '../entities/Blocks/ViewBlocks/TextBlock'
import { BiLoaderAlt } from 'react-icons/bi'
import ShotPageFooter from '../widgets/ShotPageFooter'
import ConfettiForNewShot from '../widgets/Confetti'
import ViewsHistoryWatcher from '../entities/ViewsHistoryWatcher'
import { fetchFile } from '@/helpers/fetchFile'

type Props = {
    shot: DocShotData | null
    user: ShortUserData | null
    needConfetti?: boolean
}
const ShotPage = ({ shot, user, needConfetti=false }: Props) => {
    if (!shot || !user) return (
        <div className="flex flex-col items-center self-center justify-center w-full h-full max-w-md gap-4 my-auto">
            <h3 className='text-3xl font-bold text-neutral-200'>Такой работы нет</h3>
            <Link href='/' className='px-3 py-1 text-sm text-black bg-white rounded-lg'>Вернуться</Link>
        </div>
    )
    return (
        <section id='shot-page' className='relative flex flex-col w-full min-h-full p-4 gap-14 lg:px-0'>
            <div className="flex flex-col w-full max-w-md mx-auto gap-14 md:max-w-4xl h-fit shrink-0">
                <ViewsHistoryWatcher authorId={shot.authorId} shotId={shot.doc_id}  />
                <div className="flex items-center justify-center w-full max-w-2xl gap-1 px-4 py-2 mx-auto h-fit">
                    <h1 className='text-4xl font-extrabold text-center text-neutral-200'>{shot.title}</h1>
                </div>
                <MediaBlock withAmbiLight={user.isSubscriber || false} {...{ link: shot.rootBlock.link, type: shot.rootBlock.link.endsWith('.mp4') ? 'video' : 'image' }} autoPlay />
                <div className="flex flex-col w-full px-6 md:px-12 h-fit gap-14">
                {
                    shot.blocks.map((block, index) => {
                        if (block.type === 'image') {
                            return <MediaBlock key={`block#${index}`} {...{ link: fetchFile(block.link), type: block.link.endsWith('.mp4') ? 'video' : 'image' }} />
                            
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
            { needConfetti && <ConfettiForNewShot views={shot.views.length} /> }
            <Suspense fallback={<div className='flex items-center justify-center w-full h-96'><BiLoaderAlt size={17} className='animate-spin'/></div>}>
                <ShotPageFooter shot={shot} user={user} />
            </Suspense>
        </section>
    )
}

export default ShotPage