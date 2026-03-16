import { supabase } from '@/lib/supabase'

export type BlogPost = {
  id?: string
  slug: string
  title: string
  excerpt: string
  cover: string
  date: string
  author: string
  category: string
  content: string[]
}

const fallbackBlogPosts: BlogPost[] = [
  {
    slug: 'como-elegir-tu-cirujano-estetico',
    title: 'Como Elegir Tu Cirujano Estetico En 2026',
    excerpt:
      'Claves medicas y esteticas para tomar una decision segura antes de cualquier procedimiento.',
    cover: '/images/team/DOMA.jpg',
    date: '2026-03-10',
    author: 'Equipo DOMA',
    category: 'Guia',
    content: [
      'Elegir cirujano no es solo revisar fotos de antes y despues. Debes validar matricula, experiencia comprobable y lugar habilitado para cirugia.',
      'En la primera consulta, el profesional debe evaluar tu caso clinico completo, no venderte un procedimiento estandar. Cada cuerpo requiere una planificacion distinta.',
      'Tambien es clave entender tiempos de recuperacion, riesgos y controles postoperatorios. Un buen equipo te acompana antes, durante y despues de la cirugia.',
    ],
  },
  {
    slug: 'recuperacion-liposuccion-hd',
    title: 'Recuperacion De Una Liposuccion HD: Que Esperar Semana A Semana',
    excerpt:
      'Una guia clara para transitar el postoperatorio con menos ansiedad y mejores resultados.',
    cover: '/images/team/DOMA_Personal.jpg',
    date: '2026-03-06',
    author: 'Dr. Pablo Vega',
    category: 'Postoperatorio',
    content: [
      'La primera semana suele incluir inflamacion y uso de faja compresiva. Es normal y forma parte del proceso de modelado corporal.',
      'Entre la segunda y cuarta semana se observa una baja progresiva de edema. Los controles y drenajes ayudan a mejorar confort y evolucion.',
      'El resultado final no es inmediato: se consolida en los meses siguientes. La constancia en cuidados hace una gran diferencia.',
    ],
  },
  {
    slug: 'tendencias-medicina-estetica-natural',
    title: 'Tendencias En Medicina Estetica Natural',
    excerpt:
      'Menos exageracion, mas armonia facial y corporal: hacia donde va la estetica actual.',
    cover: '/images/team/DOMA_Personal-2.jpg',
    date: '2026-02-28',
    author: 'Equipo Medico DOMA',
    category: 'Tendencias',
    content: [
      'La demanda actual prioriza resultados naturales y proporcionados. El objetivo es realzar rasgos, no transformar por completo.',
      'Se combinan tecnicas quirurgicas con medicina estetica para optimizar tiempos y resultados de manera progresiva.',
      'Una evaluacion integral permite construir planes a medida que respetan identidad, anatomia y expectativas reales.',
    ],
  },
]

function normalizeBlogPost(item: any): BlogPost {
  return {
    id: item.id,
    slug: item.slug || '',
    title: item.title || '',
    excerpt: item.excerpt || '',
    cover: item.cover || '/images/team/DOMA.jpg',
    date: item.date || new Date().toISOString().slice(0, 10),
    author: item.author || 'Equipo DOMA',
    category: item.category || 'Guia',
    content: Array.isArray(item.content)
      ? item.content
      : String(item.content || '')
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
  }
}

export async function getAllBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })

  if (error || !data || data.length === 0) {
    return [...fallbackBlogPosts].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  return data.map(normalizeBlogPost)
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!error && data) {
    return normalizeBlogPost(data)
  }

  return fallbackBlogPosts.find((post) => post.slug === slug)
}
