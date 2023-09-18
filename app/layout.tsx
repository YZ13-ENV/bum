import './globals.css'
import { Nunito_Sans } from 'next/font/google'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';
import StateProvider from '@/components/StateProvider'
import SessionWatcher from '@/components/entities/session/session.watcher'
import TokenWatcher from '@/components/entities/session/token.watcher'
import LayoutWrapper from '@/components/LayoutWrapper';
import AppHeader from '@/components/widgets/AppHeader';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react'
const SessionPicker = dynamic(() => import('@/components/widgets/SessionPicker'));
const NunitoSans = Nunito_Sans({ subsets: ['latin', 'cyrillic'], variable: '--root-font' })

export const metadata: Metadata = {
  title: 'Dey',
  description: 'Добро пожаловать в Dey, начните исследовать мир дизайна уже сегодня',
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
      title: 'Dey',
      description: 'Добро пожаловать в Dey, начните исследовать мир дизайна уже сегодня',    
      images: 'https://cdn.darkmaterial.space/dm/cover/dm-dey-cover.png',
  },
  openGraph: {
    type: 'website',
    title: 'Dey',
    description: 'Добро пожаловать в Dey, начните исследовать мир дизайна уже сегодня',
    siteName: 'Dey',
    url: 'https://design.darkmaterial.space',
    images: [ { url: 'https://cdn.darkmaterial.space/dm/cover/dm-dey-cover.png' } ],
},
};

export default function RootLayout(props: { children: ReactNode, modal: ReactNode }) {
  return (
    <StateProvider>
      <LayoutWrapper>
        <html lang="en" className={`${NunitoSans.className} ${NunitoSans.variable}`}>
          <body id='root' className='flex flex-col overflow-x-hidden body_wrapper'>
            <SessionWatcher />
            <TokenWatcher />
            <AppHeader />
            <SessionPicker />
            <main className="flex flex-col w-full shrink-0 shot_wrapper">
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
