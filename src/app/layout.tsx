import './globals.css'
import type { ReactNode } from 'react'
import { Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { SiteHeader } from '@/components/layout/SiteHeader'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '500', '600', '700'],
})

const schnyderS = localFont({
  src: [
    { path: '../fonts/SchnyderS-Light.otf', weight: '300', style: 'normal' },
    { path: '../fonts/SchnyderS-Demi.otf', weight: '600', style: 'normal' },
    { path: '../fonts/SchnyderS-DemiItalic.otf', weight: '600', style: 'italic' },
    { path: '../fonts/SchnyderS-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-schnyder',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className={`${workSans.variable} ${schnyderS.variable}`}>
      <body className='font-sans'>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
