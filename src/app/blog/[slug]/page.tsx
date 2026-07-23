import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { formatBlogDate, getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog'

export const revalidate = 60
export const dynamicParams = true

function renderBoldText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-doma-dark">{part.slice(2, -2)}</strong>
    }

    return <span key={index}>{part}</span>
  })
}

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
            <span>{formatBlogDate(post.date)}</span>
          </div>

          <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden mb-10">
            <Image src={post.cover} alt={post.title} fill className="object-cover" />
          </div>

          <div className="space-y-6">
            {post.content.map((line, index) => {
              // H2 headers
              if (line.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="text-3xl font-black text-doma-dark leading-tight mt-10 mb-4"
                  >
                    {line.slice(3)}
                  </h2>
                )
              }
              // H3 headers
              if (line.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className="text-xl font-extrabold text-doma-dark leading-tight mt-8 mb-3"
                  >
                    {line.slice(4)}
                  </h3>
                )
              }
              // List items
              if (line.startsWith('- ')) {
                return (
                  <div key={index} className="flex items-start gap-3 pl-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-doma-accent mt-2.5 shrink-0" />
                    <span className="text-doma-muted text-lg leading-relaxed">
                      {line.slice(2)}
                    </span>
                  </div>
                )
              }
              // Checkmark items
              if (line.startsWith('✔️')) {
                return (
                  <div key={index} className="flex items-start gap-3 pl-4">
                    <span className="text-doma-accent mt-0.5 shrink-0">✔️</span>
                    <span className="text-doma-muted text-lg leading-relaxed">
                      {renderBoldText(line.slice(2).trim())}
                    </span>
                  </div>
                )
              }
              // Regular paragraphs
              return (
                <p
                  key={index}
                  className="text-doma-muted text-lg leading-relaxed"
                >
                  {renderBoldText(line)}
                </p>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-3xl bg-doma-light/20 border border-doma-light/40 text-center">
            <p className="text-doma-dark font-bold text-lg mb-4">
              ¿Querés una evaluación personalizada?
            </p>
            <a href="/contacto" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-doma-accent text-white font-bold text-sm hover:bg-doma-accent/90 transition-colors">
              Agendar consulta
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
