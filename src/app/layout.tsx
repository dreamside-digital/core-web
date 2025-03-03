import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import { Montserrat, Bebas_Neue } from 'next/font/google' 
import '../styles/index.css'


const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})
 
const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-bebas-neue',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://corephilanthropygroup.com'),
  title: {
    default: 'Core Philanthropy Group',
    template: '%s | Core Philanthropy Group'
  },
  description: 'Our mission is to help you better understand, communicate with, and engage your core audiences.',
  openGraph: {
    title: 'Core Philanthropy Group',
    description: 'Our mission is to help you better understand, communicate with, and engage your core audiences.',
    url: absoluteUrl('/'),
    siteName: 'Core Philanthropy Group',
    images: [
      {
        url: absoluteUrl('/images/og-image.png'),
        width: 1800,
        height: 1600
      }
    ],
    locale: 'en_CA',
    type: 'website'
  },
  icons: {
    icon: [{ url: '/favicon/favicon-32x32.png' }],
    apple: [{ url: '/favicon/apple-touch-icon.png' }]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${bebas_neue.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}
