'use client'
import { useLocalStorageState } from 'ahooks'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {
    params: {
        url: string
    },
    searchParams: {
        path: string | undefined
    }
}
const RedirectToApp = ({ params, searchParams }: Props) => {
    const [sid] = useLocalStorageState<string | null>( 'sid', { defaultValue: null } );
    useEffect(() => {
        if (params.url.includes('darkmaterial.space')) {
            if (searchParams) {
                const url = `https://${params.url}${searchParams.path}${sid ? `?token=${sid}` : ''}`
                redirect(url)
            } else {
                const url = `https://${params.url}${sid ? `?token=${sid}` : ''}`
                redirect(url)
            }
        }
    },[sid, params])
    return (
        <div className='flex flex-col items-center justify-center gap-2 shot_wrapper'>

            { process.env.NODE_ENV === 'development' && <span>{params.url}</span> }
            { process.env.NODE_ENV === 'development' && <span>{sid}</span> }
            
            <BiLoaderAlt size={25} className='animate-spin' />
            <span className='text-sm text-neutral-400'>Подождите, мы вас переправим...</span>
        </div>
    )
}

export default RedirectToApp