import Link from 'next/link'
import Image from 'next/image'

export default function Footer({ config }: { config: any }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="relative w-48 h-24">
              <Image
                src={config.footerLogo as string}
                alt={config.websiteTitle as string}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <p className="text-sm mt-4 text-gray-400">
              © {currentYear} Core Philanthropy Group. All rights reserved.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-4 md:items-end md:text-right">
            <Link href="/about" className="hover:text-gray-400 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">
              Contact Us
            </Link>
            <Link href={config.calendarLink as string} className="hover:text-gray-400 transition-colors">
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
