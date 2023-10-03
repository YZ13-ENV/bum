'use client'
import { useLocalStorageState } from 'ahooks'
import { Button } from 'antd'
import React from 'react'
import { BiCookie } from 'react-icons/bi'

const CookiesAlert = () => {
    const [cookies, setCookies] = useLocalStorageState<string | undefined>(
        'cookies',
        {
          defaultValue: undefined,
        },
    );
    if (cookies && cookies === 'true') return null
    return (
        <div className='fixed bottom-0 left-0 z-30 w-full p-0 md:p-4'>
            <div className="flex items-center justify-between w-full max-w-xl px-6 py-2 mx-auto border rounded-none md:px-4 bg-neutral-950 border-neutral-900 h-14 md:rounded-lg">
                <div className="flex items-center gap-2 w-fit h-fit">
                    <BiCookie size={17} />
                    <span className='text-sm text-neutral-300'>Мы используем Cookies, для вашего удобства</span>
                </div>
                <Button onClick={() => setCookies('true')}>Хорошо</Button>
            </div>
        </div>
    )
}

export default CookiesAlert