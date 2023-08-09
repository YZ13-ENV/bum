'use client'
import React from 'react'
import { ConfigProvider, theme } from 'antd'
import { useAppSelector } from '@/components/entities/store/store'
import { StyleProvider } from '@ant-design/cssinjs'
import StyledComponentsRegistry from '@/components/AntdComponents/AntdRegistry'
import ru_RU from 'antd/locale/ru_RU'
import ThemeWatcher from './entities/settings/ThemeWatcher'
type Props = {
    children: React.ReactNode
}
const LayoutWrapper = ({ children }: Props) => {
    const darkMode = useAppSelector(state => state.settings.darkMode)
    return (
        <ConfigProvider locale={ru_RU}
        theme={{
          algorithm: [darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm, theme.compactAlgorithm],
          token: {
            wireframe: true
          }
        }}
        >
            <ThemeWatcher />
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