'use client'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import StyledComponentsRegistry from '@/components/AntdComponents/AntdRegistry'
import ru_RU from 'antd/locale/ru_RU'
import { Suspense } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import Image from 'next/image'
type Props = {
    children: React.ReactNode
}
const LayoutWrapper = ({ children }: Props) => {
    const Placeholder = () => <div className='w-screen h-screen bg-black'>
        <div className="max-w-md w-full h-full flex items-center justify-center flex-col gap-2">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <Image src='/bum.svg' width={128} height={128} alt='bum-logo' />
            </div>
            <div className="w-full h-36 flex items-center justify-center">
                <span className='text-neutral-400 font-medium'>DarkMaterial</span>
            </div>
        </div>
    </div>
    return (
        <ConfigProvider locale={ru_RU}
        theme={{
          algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
          token: {
            wireframe: true
          }
        }}
        >
            {
                !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'development'
                ? <StyleProvider hashPriority='high'>
                    <Suspense fallback={<Placeholder />}>
                        {children}
                    </Suspense>
                </StyleProvider>
                : <StyledComponentsRegistry>
                    <Suspense fallback={<Placeholder />}>
                        {children}
                    </Suspense>
                </StyledComponentsRegistry>
            }
        </ConfigProvider>
    )
}

export default LayoutWrapper