import Image from 'next/image'
import { Metadata } from 'next'
import { OstDocument } from 'outstatic'
import Layout from '@/components/Layout'
import markdownToHtml from '@/lib/markdownToHtml'
import { getDocumentSlugs, load } from 'outstatic/server'
import DateFormatter from '@/components/DateFormatter'
import { absoluteUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Post = {
  tags: { value: string; label: string }[]
} & OstDocument

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getData(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(`/posts/${post.slug}`),
      images: [
        {
          url: absoluteUrl(post?.coverImage || '/images/og-image.png'),
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: absoluteUrl(post?.coverImage || '/images/og-image.png')
    }
  }
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getData(slug)
  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto">
        <article className="mb-24 mt-6">
          <div className="relative mb-2 md:mb-4 sm:mx-0 w-full h-52 md:h-96">
            <Image
              alt={post.title}
              src={post?.coverImage || ''}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <h1 className="font-title text-5xl mb-4 mt-12">
            {post.title}
          </h1>
          <div className="hidden md:block md:mb-12 text-slate-600">
            Written on <DateFormatter dateString={post.publishedAt} /> by{' '}
            {post?.author?.name || ''}.
          </div>
          <hr className="border-neutral-200 mt-10 mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-3">
              <div
                className="prose mb-8 prose-cream prose-h1:text-cream prose-h1:font-title prose-h1:text-5xl prose-h1:mb-8 prose-h1:text-center text-cream"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
            <div className="col-span-1">
              <h3 className="text-2xl font-title mb-4">Tags</h3>
              <div className="flex flex-col justify-start gap-2">
                {Array.isArray(post?.tags)
                ? post.tags.map(({ label }) => (
                    <div key={label}>
                      <span className="bg-olive rounded-full px-3 py-1 text-sm font-medium text-cream mr-2">
                        {label}
                      </span>
                    </div>
                ))
              : null}
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  )
}

async function getData(slug: string) {
  const db = await load()

  const post = await db
    .find<Post>({ collection: 'posts', slug: slug }, [
      'title',
      'publishedAt',
      'description',
      'slug',
      'author',
      'content',
      'coverImage',
      'tags'
    ])
    .first()

  if (!post) {
    notFound()
  }

  const content = await markdownToHtml(post.content)

  return {
    ...post,
    content
  }
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs('posts')
  console.log({posts})
  return posts.map((slug) => ({ slug }))
}
