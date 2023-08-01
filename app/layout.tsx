import LayoutWrapper from '@/components/LayoutWrapper'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthWatcher from '@/components/entities/authWatcher/watcher'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Design',
  description: 'App for designers and developers for inspireration',
  icons: ['icon?<generated>']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutWrapper>
      <html lang="en" className={inter.className}>
        <body className='body_wrapper'>
          <AuthWatcher />
          {children}
        </body>
      </html>
    </LayoutWrapper>
  )
}
