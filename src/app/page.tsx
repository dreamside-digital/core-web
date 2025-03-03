import Layout from '../components/Layout'
import { load } from 'outstatic/server'
import markdownToHtml from '../lib/markdownToHtml'
import Link from 'next/link'

export default async function Index() {
  const { page, allPosts, allServices } = await getData()
  const content = await markdownToHtml(page.content)

  return (
    <Layout>
      <section className="pt-16 pb-16">
        <div className="container mx-auto px-4 mx-auto text-center">
          <div
            className="prose lg:prose-2xl prose-cream prose-h1:text-cream text-cream"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="flex justify-center mt-8">
            <Link href={page.buttonLink} className="btn btn-emerald">{page.buttonText}</Link>
          </div>
        </div>
      </section>

      <section id="services" className="pt-16 pb-16 bg-cream text-forest">
        <div className="container mx-auto px-4 mx-auto">
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
    </Layout>
  )
}

async function getData() {
  const db = await load()

  const page = await db
    .find({ collection: 'pages', slug: 'home' }, ['content', 'buttonText', 'buttonLink'])
    .first()

    console.log({page})


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
    .sort({ publishedAt: -1 })
    .toArray()

    console.log({allServices})

  return {
    page,
    allPosts,
    allServices
  }
}
