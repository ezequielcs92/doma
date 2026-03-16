import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <article className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-doma-accent mb-4">
            {post.category}
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-doma-dark leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-doma-muted mb-8">
            <span>{post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString('es-AR')}</span>
          </div>

          <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden mb-10">
            <Image src={post.cover} alt={post.title} fill className="object-cover" />
          </div>

          <div className="space-y-6">
            {post.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-doma-muted text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
