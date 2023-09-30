import { uniq, flatten } from 'lodash'
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'
import Link from 'next/link'
import { getAllShot } from '../fetchers'

const TagsPage = async() => {
    const shots = await getAllShot()
    const onlyTags = shots.length > 0 ? uniq(flatten(shots.map(shot => shot.tags))) : []
    return (
        <div className='flex flex-col w-full max-w-5xl gap-4 px-4 mx-auto'>
            <div className="flex items-center justify-center w-full h-fit">
                <h1 className='text-2xl font-semibold text-center text-neutral-200'>Тэги</h1>
            </div>
            {
                onlyTags.length > 0 &&
                onlyTags
                .sort()
                .map(tag => 
                    <Link href={`/tags/${tag}`} key={tag} 
                    className='flex items-start justify-between w-full h-24 p-4 transition-colors border cursor-pointer rounded-xl border-neutral-700 hover:bg-neutral-900'>
                        <h1 className='text-base font-medium capitalize text-neutral-300'>{tag}</h1>
                        <BiRightArrowAlt size={19} />
                    </Link>
                )
            }
        </div>
    )
}

export default TagsPage