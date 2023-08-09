'use client'
import React from 'react'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import StyledComponentsRegistry from '@/components/AntdComponents/AntdRegistry'
import ru_RU from 'antd/locale/ru_RU'
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
                        {children}
                </StyleProvider>
                : <StyledComponentsRegistry>
                        {children}
                </StyledComponentsRegistry>
            }
        </ConfigProvider>
    )
}

export default LayoutWrapper