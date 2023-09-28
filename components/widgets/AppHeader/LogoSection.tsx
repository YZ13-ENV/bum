'use client'
import { app } from '@/utils/app';
import { fetchAndActivate, getRemoteConfig, getString } from 'firebase/remote-config';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


const LogoSection = () => {
    const [tag, setTag] = useState<string>('')
    useEffect(() => {
        const remoteConfig = getRemoteConfig(app);
        remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
        fetchAndActivate(remoteConfig)
        .then(() => {
            const bum_string = getString(remoteConfig, 'bum_tag')
            setTag(bum_string)
        })
        .catch((err) => {
        });
    },[])
    return (
        <Link href='/' className='flex items-center gap-2 px-1 w-fit h-fit'>
            <Image src={'/bum.svg'} width={36} height={36} alt='v2-logo' />
            <span className='text-2xl font-medium text-neutral-200'>
                bum
            </span>
            <sup className='text-xs text-neutral-400'>{process.env.NODE_ENV === 'development' ? 'Dev' : tag ? tag : 'Beta'}</sup>
        </Link>
    )
}

export default LogoSection