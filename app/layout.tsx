import LayoutWrapper from '@/components/LayoutWrapper'
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import AppHeader from '@/components/widgets/AppHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dey',
  description: 'App for designers and developers for inspiration',
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
        <body className='flex flex-col overflow-x-hidden body_wrapper'>
          <AppHeader />
          <div className="flex flex-col w-full shrink-0 content_wrapper">
            {children}
          </div>
        </body>
      </html>
    </LayoutWrapper>
  )
}
