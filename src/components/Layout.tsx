import Footer from './Footer'
import Navigation from './Navigation' 
import { load } from 'outstatic/server'

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const db = await load()
  const config = await db
    .find({ collection: 'general' }, ['primaryLogo', 'footerLogo', 'calendarLink', 'websiteTitle'])
    .first()

  return (
    <>
      <div className="min-h-screen pt-20 bg-forest text-cream">
        <Navigation config={config}/>
        <main>{children}</main>
        <Footer config={config}/>
      </div>
    </>
  )
}

export default Layout
