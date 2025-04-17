import Link from 'next/link'
import Image from 'next/image'

export default function Navigation({ config }: { config: any }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container max-w-screen-xl mx-auto">
        <div className="bg-cream mt-4 px-4 py-2 flex items-center justify-between shadow-lg">
          <Link href="/" className="hidden sm:block w-24">
            <Image
              src={config.primaryLogo as string}
              alt={config.websiteTitle as string}
              width={200}
              height={100}
            />
          </Link>

          <Link href="/" className="sm:hidden w-8">
            <Image
              src={config.smallLogo as string}
              alt={config.websiteTitle as string}
              width={200}
              height={100}
            />
          </Link>
          {/* Navigation Links */}
          <div className="flex gap-2 md:gap-8 font-title text-forest text-xl">
            <Link href="/about" className="hover:opacity-75">
              About
            </Link>
            <Link href="/contact" className="hover:opacity-75">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href={config.ctaLink as string}
            className="bg-emerald text-white px-2 py-1 md:px-4 md:py-2 font-title hover:bg-olive transition-colors"
          >
            {config.ctaText}
          </Link>
        </div>
      </nav>
    </header>
  )
} 