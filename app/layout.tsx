import './globals.css'
import { Rubik } from 'next/font/google'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';
import StateProvider from '@/components/StateProvider'
import SessionWatcher from '@/components/entities/session/session.watcher'
import TokenWatcher from '@/components/entities/session/token.watcher'
import LayoutWrapper from '@/components/LayoutWrapper';
import AppHeader from '@/components/widgets/AppHeader';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react'
import CookiesAlert from '@/components/widgets/CookiesAlert';
const SessionPicker = dynamic(() => import('@/components/widgets/SessionPicker'));
const rubik = Rubik({ subsets: ['latin', 'cyrillic'], variable: '--root-font' })

export const metadata: Metadata = {
  title: 'bum',
  description: 'Добро пожаловать в bum, начните исследовать мир дизайна уже сегодня',
  authors: { name:"DM-Team", url: 'https://github.com/yz13-env'},
  themeColor: '#000000',
  colorScheme: 'dark',
  keywords: ['dey', 'dm', 'dark', 'material', 'dark material', 'dribbble', 'behance', 'drible', 'dribble'],
  icons: [ 'https://cdn.darkmaterial.space/dm/icons/dm-dey.svg' ],
  robots: 'index, follow',
  alternates: { canonical: 'https://design.darkmaterial.space' },
  applicationName: 'Dark Material',
  viewport: 'width=device-width, initial-scale=1',
  twitter: {
      card: 'summary',
      title: 'bum',
      description: 'Добро пожаловать в bum, начните исследовать мир дизайна уже сегодня',    
      images: 'https://cdn.darkmaterial.space/dm/cover/dm-dey-cover.png',
  },
  openGraph: {
    type: 'website',
    title: 'bum',
    description: 'Добро пожаловать в bum, начните исследовать мир дизайна уже сегодня',
    siteName: 'bum',
    url: 'https://design.darkmaterial.space',
    images: [ { url: 'https://cdn.darkmaterial.space/dm/cover/dm-dey-cover.png' } ],
},
};

export default function RootLayout(props: { children: ReactNode, modal: ReactNode }) {
  return (
    <StateProvider>
      <LayoutWrapper>
        <html lang="en" className={`${rubik.className} ${rubik.variable}`}>
          <body id='root' className='flex flex-col overflow-x-hidden body_wrapper'>
            <SessionWatcher />
            <TokenWatcher />
            <AppHeader />
            <SessionPicker />
            <CookiesAlert />
            <main className="flex flex-col w-full h-full shrink-0 shot_wrapper">
              {props.children}
              {/* {props.modal} */}
            </main>
            <Analytics />
          </body>
        </html>
      </LayoutWrapper>
    </StateProvider>
  )
}
