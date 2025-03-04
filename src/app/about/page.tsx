import Layout from '@/components/Layout'
import { load } from 'outstatic/server'
import markdownToHtml from '@/lib/markdownToHtml'
import ContactForm from '@/components/ContactForm'

export default async function About() {
  const { page } = await getData()
  const content = await markdownToHtml(page.content)

  return (
    <Layout>
      <section className="pt-16 pb-16">
        <div className="container max-w-screen-xl mx-auto px-4 mx-auto text-justify">
          <h2 className="text-cream uppercase tracking-wider font-semibold text-center mb-12">
            Our Vision
          </h2>
          <div
            className="prose mx-auto prose-cream prose-h1:text-cream prose-h1:font-title prose-h1:text-4xl prose-h1:mb-8 prose-h1:text-center text-cream"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      <section id="team" className="pt-16 pb-16 bg-snow text-forest">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-forest uppercase tracking-wider font-semibold text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="aspect-square w-48 mx-auto mb-6 bg-cream rounded-full" />
              <h3 className="text-2xl font-title mb-2">Team Member Name</h3>
              <p className="text-forest/75 mb-4">Position / Role</p>
              <p className="text-forest">
                Brief bio about the team member and their expertise in nonprofit consulting.
              </p>
            </div>
            <div className="text-center">
              <div className="aspect-square w-48 mx-auto mb-6 bg-cream rounded-full" />
              <h3 className="text-2xl font-title mb-2">Team Member Name</h3>
              <p className="text-forest/75 mb-4">Position / Role</p>
              <p className="text-forest">
                Brief bio about the team member and their expertise in nonprofit consulting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="pt-16 pb-16 bg-cream text-forest">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-forest uppercase tracking-wider font-semibold text-center mb-12">
            How We Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald text-white flex items-center justify-center text-2xl font-title mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-title mb-4">Discovery</h3>
              <p>We start by understanding your organization's unique needs and challenges.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald text-white flex items-center justify-center text-2xl font-title mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-title mb-4">Strategy</h3>
              <p>Together, we develop a customized plan to achieve your goals.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald text-white flex items-center justify-center text-2xl font-title mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-title mb-4">Implementation</h3>
              <p>We guide you through executing the strategy and measuring results.</p>
            </div>
          </div>
        </div>
      </section>

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
    </Layout>
  )
}

async function getData() {
  const db = await load()

  const page = await db
    .find({ collection: 'pages', slug: 'about' }, ['content'])
    .first()

  return {
    page
  }
} 