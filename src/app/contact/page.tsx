import Layout from '@/components/Layout'
import { load } from 'outstatic/server'
import markdownToHtml from '@/lib/markdownToHtml'
import ContactForm from '@/components/ContactForm'

export default async function Contact() {
  const { page } = await getData()
  const content = await markdownToHtml(page.content)

  return (
    <Layout>
      <section id="contact" className="pt-16 pb-16 bg-forest text-cream">
        <div className="container max-w-screen-md mx-auto mx-auto">
          <h2 className="text-cream uppercase tracking-wider font-semibold text-center mb-12">
            Let's Talk
          </h2>
          <div className="mt-8">
            <h3 className="text-cream text-5xl text-center font-title uppercase mb-8">
              Ready to get started?
            </h3>
            <p className="text-cream text-justify mb-12">
              {`Building strong donor relationships takes time and care. Whether you're looking to deepen engagement, grow monthly giving, or connect with major donors, we're here to help. Let's work together to create a thoughtful strategy that fits your organization's needs. Reach out - we'd love to chat!`}
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="pt-16 pb-16 bg-snow text-forest">
        <div className="container max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-12 shadow-lg">
              <h3 className="text-2xl font-title mb-4">Email</h3>
              <a 
                href="mailto:hello@corephilanthropygroup.com" 
                className="text-emerald hover:text-olive transition-colors"
              >
                hello@corephilanthropygroup.com
              </a>
            </div>
            <div className="bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-title mb-4">Phone</h3>
              <a 
                href="tel:+1234567890" 
                className="text-emerald hover:text-olive transition-colors"
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
    .find({ collection: 'pages', slug: 'contact' }, ['content'])
    .first()

  return {
    page
  }
} 