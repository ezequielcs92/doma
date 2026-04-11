import { supabase, isSupabaseConfigured } from '@/lib/supabase'

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
    title: 'Cómo elegir tu cirujano estético',
    excerpt:
      'Claves médicas y estéticas para tomar una decisión segura antes de cualquier procedimiento.',
    cover: '/images/team/DOMA.jpg',
    date: '2026-03-10',
    author: 'Equipo DOMA',
    category: 'Guía',
    content: [
      '## Cómo elegir un cirujano estético de forma segura',
      'Elegir al profesional adecuado es clave para lograr un buen resultado y transitar el proceso con tranquilidad.',
      '### Estas son las 5 cosas más importantes a tener en cuenta:',
      '✔️ **Formación y experiencia** — Asegurate de que el profesional tenga experiencia en el procedimiento que estás buscando.',
      '✔️ **Seguridad del lugar** — La cirugía debe realizarse en un sanatorio habilitado, con el equipo necesario.',
      '✔️ **Resultados reales** — Revisar casos reales te permite entender el estilo de trabajo y los resultados que podés esperar.',
      '✔️ **Acompañamiento** — El seguimiento antes y después de la cirugía es fundamental para una buena recuperación.',
      '✔️ **Confianza** — Sentirte cómoda y segura en la consulta es clave para tomar una decisión.',
      '### Conclusión',
      'Un buen resultado no depende solo de la cirugía, sino del equipo y el proceso completo.',
      'Si estás evaluando realizarte un procedimiento, podés agendar una consulta con nuestro equipo para recibir una evaluación personalizada.',
    ],
  },
  {
    slug: 'lipo-o-abdominoplastia',
    title: '¿Lipo o abdominoplastia? Cómo saber cuál necesitás',
    excerpt:
      'Es una de las dudas más frecuentes en consulta. Aunque ambos procedimientos trabajan el abdomen, no son lo mismo.',
    cover: '/images/team/DOMA_Personal.jpg',
    date: '2026-03-06',
    author: 'Dr. Pablo Vega',
    category: 'Procedimientos',
    content: [
      '## ¿Lipo o abdominoplastia? Cómo saber cuál necesitás',
      'Es una de las dudas más frecuentes en consulta. Aunque ambos procedimientos trabajan el abdomen, no son lo mismo.',
      '### Lipoescultura',
      'Está indicada cuando hay grasa localizada, pero la piel tiene buena elasticidad. Permite moldear el contorno corporal y definir la cintura.',
      '### Abdominoplastia',
      'Se recomienda cuando hay flacidez o exceso de piel, especialmente después de embarazos o cambios de peso. Permite retirar piel sobrante y lograr un abdomen más plano y firme.',
      '### Entonces, ¿cuál es mejor?',
      'Depende de tu caso:',
      '- Si predomina la grasa → lipo',
      '- Si hay piel floja → abdominoplastia',
      '- En muchos casos → combinación de ambas',
      '### Conclusión',
      'Una correcta evaluación es clave para elegir el procedimiento adecuado y lograr un resultado armónico.',
      'Si querés saber qué es lo ideal en tu caso, podés enviarnos fotos o agendar una consulta con el equipo para una evaluación personalizada.',
    ],
  },
  {
    slug: 'botox-y-acido-hialuronico',
    title: 'Botox y ácido hialurónico: ¿cuál es mejor para vos?',
    excerpt:
      'Es una de las dudas más comunes en medicina estética. Aunque muchas veces se confunden, cumplen funciones diferentes.',
    cover: '/images/team/DOMA_Personal-2.jpg',
    date: '2026-02-28',
    author: 'Dra. Majo Arauz',
    category: 'Medicina Estética',
    content: [
      '## Botox y ácido hialurónico: ¿cuál es mejor para vos?',
      'Es una de las dudas más comunes en medicina estética. Aunque muchas veces se confunden, cumplen funciones diferentes.',
      '### Botox (toxina botulínica)',
      'Se utiliza para relajar los músculos responsables de las líneas de expresión. Ideal para:',
      '- Arrugas en frente',
      '- Entrecejo',
      '- Patas de gallo',
      '✔️ Previene y suaviza arrugas dinámicas',
      '✔️ Resultado natural sin perder expresión',
      '### Ácido hialurónico',
      'Se utiliza para aportar volumen, hidratar y mejorar la calidad de la piel. Ideal para:',
      '- Labios',
      '- Ojeras',
      '- Pómulos',
      '- Surcos',
      '✔️ Rellena y redefine',
      '✔️ Mejora la hidratación y el aspecto de la piel',
      '### Entonces, ¿cuál necesito?',
      'Depende de tu objetivo:',
      '- Arrugas de expresión → Botox',
      '- Volumen o contorno → Ácido hialurónico',
      '- Muchas veces → combinación de ambos',
      '### Conclusión',
      'No se trata de elegir uno u otro, sino de entender qué necesita tu rostro para lograr un resultado natural y armónico.',
      'Si querés saber qué es lo ideal en tu caso, podés agendar una consulta y recibir una evaluación personalizada.',
    ],
  },
  {
    slug: 'que-es-un-mommy-makeover',
    title: '¿Qué es un Mommy Makeover y cuándo conviene hacerlo?',
    excerpt:
      'Después del embarazo, muchas mujeres notan cambios en su cuerpo que no logran revertir solo con ejercicio o alimentación.',
    cover: '/images/team/DOMA_Personal-3.jpg',
    date: '2026-02-20',
    author: 'Dr. Pablo Vega',
    category: 'Procedimientos',
    content: [
      '## ¿Qué es un Mommy Makeover y cuándo conviene hacerlo?',
      'Después del embarazo, muchas mujeres notan cambios en su cuerpo que no logran revertir solo con ejercicio o alimentación. El Mommy Makeover es una combinación de procedimientos pensada para recuperar la figura de forma integral.',
      '### ¿Qué incluye?',
      'Depende de cada caso, pero generalmente combina:',
      '- Abdominoplastia (para el abdomen)',
      '- Lipoescultura (para cintura y contorno)',
      '- Cirugía mamaria (aumento, levantamiento o reducción)',
      '### ¿Cuándo está indicado?',
      '✔️ Cuando hay flacidez abdominal',
      '✔️ Cambios en el volumen o forma de las mamas',
      '✔️ Grasa localizada que no se reduce',
      '### ¿Cuándo es el mejor momento?',
      'Se recomienda cuando:',
      '✔️ Ya pasaron varios meses desde el parto',
      '✔️ No estás en período de lactancia',
      '✔️ Tu peso está estable',
      '### Ventajas',
      '✔️ Se trabajan varias zonas en una sola cirugía',
      '✔️ Resultados más armónicos',
      '✔️ Recuperación unificada',
      '### Conclusión',
      'El Mommy Makeover permite recuperar la figura de forma completa, siempre adaptado a las necesidades de cada paciente.',
      'Si estás evaluando este tipo de cambio, podés agendar una consulta con el equipo para recibir una evaluación personalizada.',
    ],
  },
  {
    slug: 'resultados-naturales-medicina-estetica',
    title: 'Resultados naturales en medicina estética: qué significa realmente',
    excerpt:
      'Hoy el objetivo de la medicina estética no es transformar el rostro, sino realzar y armonizar sin perder la naturalidad.',
    cover: '/images/team/DOMA_Personal-4.jpg',
    date: '2026-02-15',
    author: 'Dra. Majo Arauz',
    category: 'Medicina Estética',
    content: [
      '## Resultados naturales en medicina estética: qué significa realmente',
      'Hoy el objetivo de la medicina estética no es transformar el rostro, sino realzar y armonizar sin perder la naturalidad.',
      '### ¿Qué es un resultado natural?',
      'Es aquel que mejora tu apariencia sin que se note el tratamiento. Te ves más fresca, más descansada, más armónica. Pero seguís siendo vos.',
      '### ¿Cómo se logra?',
      'Con un enfoque personalizado que combina tratamientos según cada rostro:',
      '✔️ Toxina botulínica → suaviza líneas de expresión',
      '✔️ Ácido hialurónico → aporta volumen y definición',
      '✔️ Bioestimuladores → mejoran la calidad de la piel',
      '### La clave',
      'Menos es más. Las mejores decisiones son las que respetan tu expresión y tu identidad.',
      'Si buscás un resultado natural, podés agendar una consulta y recibir una evaluación personalizada.',
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
  if (!isSupabaseConfigured) {
    return [...fallbackBlogPosts].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  try {
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
  } catch {
    return [...fallbackBlogPosts].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }
}

export async function getBlogPostBySlug(slug: string) {
  if (!isSupabaseConfigured) {
    return fallbackBlogPosts.find((post) => post.slug === slug)
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (!error && data) {
      return normalizeBlogPost(data)
    }

    return fallbackBlogPosts.find((post) => post.slug === slug)
  } catch {
    return fallbackBlogPosts.find((post) => post.slug === slug)
  }
}
