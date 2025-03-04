import Layout from '@/components/Layout'
import { load } from 'outstatic/server'
import markdownToHtml from '@/lib/markdownToHtml'
import ContactForm from '@/components/ContactForm'
import Image from 'next/image'

export default async function Contact() {
  const { page } = await getData()
  const content = await markdownToHtml(page.content)

  return (
    <Layout>
      <section id="contact" className="pt-16 pb-16 bg-forest text-cream">
        <div className="container max-w-screen-md mx-auto mx-auto">
          <h2 className="text-cream uppercase tracking-wider font-semibold text-center mb-12">
            {page.title}
          </h2>
          <div className="mt-8">
            <div className="prose max-w-none mx-auto mb-8 prose-cream prose-h1:text-cream prose-h1:font-title prose-h1:text-5xl prose-h1:mb-8 prose-h1:text-center text-cream" dangerouslySetInnerHTML={{ __html: content }} />
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="pt-16 pb-16 bg-snow text-forest">
        <div className="container max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-12 shadow-lg">
              <h3 className="text-5xl font-title mb-4 flex items-center gap-4">
                <Image src="/images/email-icon.svg" alt="Email" width={45} height={45} />
                <span className="pt-1">Email</span>
              </h3>
              <a 
                href="mailto:hello@corephilanthropygroup.com" 
                className="text-black hover:text-emerald transition-colors"
              >
                hello@corephilanthropygroup.com
              </a>
            </div>
            <div className="bg-white p-12 shadow-lg">
              <h3 className="text-5xl font-title mb-4 flex items-center gap-4">
                <Image src="/images/phone-icon.svg" alt="Phone" width={40} height={40} />
                <span className="pt-1">Phone</span>
              </h3>
              <a 
                href="tel:+1234567890"
                className="text-black hover:text-emerald transition-colors"
              >
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

async function getData() {
  const db = await load()

  const page = await db
    .find({ collection: 'pages', slug: 'contact' }, ['title','content'])
    .first()

  return {
    page
  }
} 