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

      <section id="services" className="pt-16 pb-16 bg-cream">
        <div className="container mx-auto px-4 mx-auto text-center">
          <div
            className="prose lg:prose-2xl prose-cream prose-h1:text-cream text-cream"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="flex justify-center mt-8">
            <Link href="/contact" className="btn btn-emerald">Book a call</Link>
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
