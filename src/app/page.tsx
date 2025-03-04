import Layout from '../components/Layout'
import { load } from 'outstatic/server'
import markdownToHtml from '../lib/markdownToHtml'
import Link from 'next/link'
import CaseStudies from '@/components/CaseStudies'
import ContactForm from '@/components/ContactForm'

export default async function Index() {
  const { page, allCaseStudies, allServices } = await getData()
  const content = await markdownToHtml(page.content)
  
  // Process case studies content
  const processedCaseStudies = await Promise.all(
    allCaseStudies.map(async (caseStudy) => ({
      ...caseStudy,
      content: await markdownToHtml(caseStudy.content)
    }))
  )

  return (
    <Layout>
      <section className="pt-16 pb-16">
        <div className="container max-w-screen-xl mx-auto px-4 mx-auto text-center">
          <div
            className="prose mx-auto lg:prose-2xl prose-cream prose-h1:text-cream text-cream"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="flex justify-center mt-8">
            <Link href={page.buttonLink as string} className="btn btn-emerald">
              {page.buttonText as string}
            </Link>
            </div>
        </div>
      </section>

      <section id="services" className="pt-16 pb-16 bg-cream text-forest">
        <div className="container max-w-screen-xl mx-auto mx-auto">
          <h2 className="text-forest uppercase tracking-wider font-semibold text-center mb-8">Our Services</h2>

          <div className="">
            {allServices.map(async (service) => {
              const content = await markdownToHtml(service.content)
              return (
                <div key={service.title} className="w-full flex flex-col md:flex-row gap-6 my-12">
                  <div className="basis-1/2">
                    <h3 className="text-forest text-5xl font-title mb-4">{service.title}</h3>
                  </div>
                  <div className="basis-1/2">
                    <div
                      className="prose text-forest"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section id="case-studies" className="pt-16 pb-16 bg-snow text-forest">
        <div className="container max-w-screen-xl mx-auto mx-auto">
          <h2 className="text-forest uppercase tracking-wider font-semibold text-center mb-12">
            Case Studies
          </h2>
          <CaseStudies caseStudies={processedCaseStudies} />
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
    .find({ collection: 'pages', slug: 'home' }, ['content', 'buttonText', 'buttonLink'])
    .first()

  const allPosts = await db
    .find({ collection: 'posts' }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'tags'
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  const allServices = await db
    .find({ collection: 'services' }, ['title', 'content'])
    .sort({ publishedAt: 1 })
    .toArray()

  const allCaseStudies = await db
    .find({ collection: 'case-studies' }, ['title', 'content'])
    .sort({ publishedAt: 1 })
    .toArray()


  return {
    page,
    allPosts,
    allServices,
    allCaseStudies
  }
}
