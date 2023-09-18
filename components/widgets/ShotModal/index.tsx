'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const ShotModal = () => {
    const params = useSearchParams()
    const userId = params.get('user')
    const shotId = params.get('shot')
    const router = useRouter()
    if (!shotId || !userId) return null
    return (
        <div onClick={() => router.push('/')} className='fixed top-0 left-0 z-50 flex flex-col items-center justify-end w-full h-full bg-black bg-opacity-50'>
            <section onClick={e => e.stopPropagation()} className='w-full max-w-6xl p-2 h-5/6 rounded-t-xl bg-neutral-950'>
                
            </section>
        </div>
    )
}

export default ShotModal