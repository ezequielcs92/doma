import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { formatBlogDate, getAllBlogPosts } from '@/lib/blog'

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-surface min-h-screen">
        <section className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-doma-violet/10 text-doma-violet text-xs font-bold uppercase tracking-widest">
              Blog DOMA
            </p>
            <h1 className="mt-5 text-4xl lg:text-6xl font-black text-doma-dark leading-tight">
              Información médica
              <br />
              <span className="gradient-text">para decidir con seguridad</span>
            </h1>
            <p className="mt-5 text-doma-muted max-w-2xl text-lg">
              Contenido creado por nuestro equipo médico para acompañarte antes, durante y después de cada tratamiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white border border-doma-light/50 rounded-3xl overflow-hidden shadow-lg shadow-doma-light/20"
              >
                <div className="relative h-52">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-doma-accent mb-3">
                    {post.category}
                  </p>
                  <h2 className="text-xl font-extrabold text-doma-dark leading-tight mb-3">
                    {post.title}
                  </h2>
                  <p className="text-doma-muted text-sm leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-doma-muted/80 mb-5">
                    <span>{post.author}</span>
                    <span>{formatBlogDate(post.date)}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-doma-violet hover:text-doma-accent transition-colors"
                  >
                    Leer articulo
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
