import Layout from '../components/Layout'
import { load } from 'outstatic/server'
import markdownToHtml from '../lib/markdownToHtml'
import Link from 'next/link'
import CaseStudies from '@/components/CaseStudies'
import ContactForm from '@/components/ContactForm'

export default async function Index() {
  const { page, allCaseStudies, allServices, contact } = await getData()
  const content = await markdownToHtml(page.content)
  const contactContent = await markdownToHtml(contact.content)
  
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
            className="prose mx-auto lg:prose-2xl prose-cream prose-h1:text-cream prose-h1:font-semibold text-cream prose-h1:leading-tight prose-h1:text-6xl"
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
                      className="prose max-w-none [&>ul]:list-none [&>ul]:pl-0 [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:mb-4
                      [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[0.6em]
                      [&>ul>li]:before:w-0 [&>ul>li]:before:h-0 
                      [&>ul>li]:before:border-t-[6px] [&>ul>li]:before:border-t-[transparent]
                      [&>ul>li]:before:border-l-[8px] [&>ul>li]:before:border-l-emerald
                      [&>ul>li]:before:border-b-[6px] [&>ul>li]:before:border-b-[transparent]"
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
            {contact.title}
          </h2>
          <div className="mt-8">
            <div className="prose max-w-none mx-auto mb-8 prose-cream prose-h1:text-cream prose-h1:font-title prose-h1:text-5xl prose-h1:mb-8 prose-h1:text-center text-cream" dangerouslySetInnerHTML={{ __html: contactContent }} />
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

  const contact = await db
    .find({ collection: 'pages', slug: 'contact' }, ['title','content'])
    .first()

  return {
    page,
    allPosts,
    allServices,
    allCaseStudies,
    contact
  }
}
