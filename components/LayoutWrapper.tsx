'use client'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import StyledComponentsRegistry from '@/components/AntdComponents/AntdRegistry'
import ru_RU from 'antd/locale/ru_RU'
import { Suspense } from 'react'
import Image from 'next/image'
type Props = {
    children: React.ReactNode
}
const LayoutWrapper = ({ children }: Props) => {
    const Placeholder = () => <div className='w-screen h-screen bg-black'>
        <div className="flex flex-col items-center justify-center w-full h-full max-w-md gap-2 mx-auto">
            <div className="flex flex-col items-center justify-center w-full h-full">
                <Image src='/bum.svg' width={64} height={64} alt='bum-logo' />
            </div>
            <div className="flex items-center justify-center w-full h-36">
                <span className='font-medium text-neutral-400'>DarkMaterial</span>
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