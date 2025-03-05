import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import { Montserrat, Bebas_Neue } from 'next/font/google' 
import { load } from 'outstatic/server'
import '@/styles/index.css'


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

export async function generateMetadata() {
  const db = await load()
  const config = await db.find({ collection: 'general' }, ['shareImage', 'websiteTitle', 'websiteDescription'])
  .first()

  return {
    metadataBase: new URL('https://corephilanthropygroup.com'),
    title: {
      default: config.websiteTitle,
      template: `%s | ${config.websiteTitle}`
    },
    description: config.websiteDescription,
    openGraph: {
      title: config.websiteTitle,
      description: config.websiteDescription,
      url: absoluteUrl('/'),
      siteName: config.websiteTitle,
      images: [
        {
          url: absoluteUrl(config.shareImage as string),
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
