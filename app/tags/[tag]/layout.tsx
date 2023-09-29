import Tabs from '@/components/widgets/Tabs'
import React from 'react'

type Props = {
    params: {
        order: string
        tag: string
    }
    children: string
}
const ShotByTagLayout = ({ params, children }: Props) => {
    return (
        <div className='flex flex-col w-full h-full'>
            <div className="flex items-center justify-center w-full h-fit">
                <h1 className='text-4xl font-bold text-center capitalize text-neutral-300'>{params.tag}</h1>
            </div>
            <Tabs prefix={`/tags/${params.tag}`} />
            <section className='flex flex-col w-full h-full p-4 md:py-4 md:px-12'>
                { children }
            </section>
        </div>
    )
}

export default ShotByTagLayout