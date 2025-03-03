import Footer from './Footer'
import Navigation from './Navigation' 

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="min-h-screen pt-20 bg-forest text-cream">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
