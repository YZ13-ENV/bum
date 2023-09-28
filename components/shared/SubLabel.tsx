'use client'
import { app } from '@/utils/app'
import { fetchAndActivate, getRemoteConfig, getString } from 'firebase/remote-config'
import React, { useEffect, useState } from 'react'

const SubLabel = () => {
  const [tag, setTag] = useState<string>('')
  useEffect(() => {
      const remoteConfig = getRemoteConfig(app);
      remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
      fetchAndActivate(remoteConfig)
      .then(() => {
          const bum_string = getString(remoteConfig, 'sub_tag')
          setTag(bum_string)
      })
      .catch((err) => {
      });
  },[])
  return <span className='px-2 py-1 text-xs text-black bg-white rounded-md'>{tag || 'Плюс'}</span>
}

export default SubLabel