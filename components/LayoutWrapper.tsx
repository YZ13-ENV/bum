'use client'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import StyledComponentsRegistry from '@/components/AntdComponents/AntdRegistry'
import ru_RU from 'antd/locale/ru_RU'
import { Suspense } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
type Props = {
    children: React.ReactNode
}
const LayoutWrapper = ({ children }: Props) => {
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
                    <Suspense fallback={<BiLoaderAlt className='animate-spin' />}>
                        {children}
                    </Suspense>
                </StyleProvider>
                : <StyledComponentsRegistry>
                    <Suspense fallback={<BiLoaderAlt className='animate-spin' />}>
                        {children}
                    </Suspense>
                </StyledComponentsRegistry>
            }
        </ConfigProvider>
    )
}

export default LayoutWrapper