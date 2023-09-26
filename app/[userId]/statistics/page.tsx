import React from 'react'
import { getShots } from '../helpers'

type Props = {
    params: {
        userId: string
    }
}
const UserStatisticsPage = async({ params }: Props) => {
    const shots = await getShots(params.userId, null)
    return (
        <section className='flex flex-col w-full h-full max-w-5xl mx-auto'>
            <div className="flex items-center justify-center w-full h-40 gap-4">
                <div className="w-1/3 h-full rounded-lg bg-neutral-900"></div>
                <div className="w-1/3 h-full rounded-lg bg-neutral-900"></div>
                <div className="w-1/3 h-full rounded-lg bg-neutral-900"></div>
            </div>
        </section>
    )
}

export default UserStatisticsPage
