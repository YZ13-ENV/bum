import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'
import { Nunito_Sans } from 'next/font/google'
import { Metadata } from 'next'
import AppHeader from '@/components/widgets/AppHeader'
import StateProvider from '@/components/StateProvider'
import Footer from '@/components/shared/ui/Footer'
import SessionWatcher from '@/components/entities/session/session.watcher'
import TokenWatcher from '@/components/entities/session/token.watcher'
const NunitoSans = Nunito_Sans({ subsets: ['latin', 'cyrillic'], variable: '--root-font' })

export const metadata: Metadata = {
  title: 'Dey',
  description: 'App for designers and developers for inspiration',
  colorScheme: 'dark'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StateProvider>
      <LayoutWrapper>
        <html lang="en" className={`${NunitoSans.className} ${NunitoSans.variable}`}>
          <body id='root' className='flex flex-col overflow-x-hidden body_wrapper'>
            <SessionWatcher />
            <TokenWatcher />
            <AppHeader />
            <div className="flex flex-col w-full min-h-full shrink-0">
              {children}
            </div>
            {/* <Footer /> */}
          </body>
        </html>
      </LayoutWrapper>
    </StateProvider>
  )
}
