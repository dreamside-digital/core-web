import Link from 'next/link'
import Image from 'next/image'

export default function Navigation({ config }: { config: any }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container max-w-screen-xl mx-auto">
        <div className="bg-cream mt-4 px-4 py-2 flex items-center justify-between shadow-lg">
          {/* Logo */}
          <Link href="/" className="w-24">
            <Image
              src={config.primaryLogo as string}
              alt={config.websiteTitle as string}
              width={200}
              height={100}
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-8 font-title text-forest text-xl">
            <Link href="/about" className="hover:opacity-75">
              About
            </Link>
            <Link href="/contact" className="hover:opacity-75">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href={config.calendarLink as string}
            className="bg-emerald text-white px-4 py-2 font-title hover:bg-olive transition-colors"
          >
            Book a call
          </Link>
        </div>
      </nav>
    </header>
  )
} 