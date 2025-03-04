import Layout from '@/components/Layout'
import { load } from 'outstatic/server'
import markdownToHtml from '@/lib/markdownToHtml'
import ContactForm from '@/components/ContactForm'
import Image from 'next/image'

// Add interface for person data
interface Person {
  title: string
  content: string
  image?: string
  imageAlt?: string
  imageCaption?: string
}

export default async function About() {
  const { page, allPeople, howWeWork } = await getData()
  const content = await markdownToHtml(page.content)
  const people = await Promise.all(allPeople.map(async (person) => ({
    title: person.title,
    content: await markdownToHtml(person.content),
    image: person.image,
    imageAlt: person.imageAlt,
    imageCaption: person.imageCaption,
  })))

  const howWeWorkContent = await markdownToHtml(howWeWork.content)

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
        <div className="container max-w-screen-xl mx-auto">
          <h2 className="text-forest uppercase tracking-wider font-semibold text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid gap-12">
            {people.map((person) => (
              <div key={person.title} className="flex gap-6 bg-white p-12 shadow-lg">
                {person.image && (
                  <div className="w-48 h-48 aspect-square">
                    <Image src={person.image as string} alt={person.title} className="w-full h-full bg-snow object-cover" />
                  </div>
                )}
                <div className="">
                  <h3 className="text-4xl font-title mb-4">{person.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: person.content }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="pt-16 pb-16 bg-cream text-forest">
        <div className="container max-w-screen-md mx-auto">
          <h2 className="text-forest uppercase tracking-wider font-semibold text-center mb-12">
            {howWeWork.title}
          </h2>
          <div className="">
            <div dangerouslySetInnerHTML={{ __html: howWeWorkContent }} />
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
  
  const allPeople = await db
    .find<Person>({ collection: 'people' }, ['title', 'content', 'image', 'imageAlt', 'imageCaption'])
    .sort("title")
    .toArray()

  const howWeWork = await db
    .find({ collection: 'pages', slug: 'how-we-work' }, ['title', 'content'])
    .first()

  return {
    page,
    allPeople,
    howWeWork
  }
} 