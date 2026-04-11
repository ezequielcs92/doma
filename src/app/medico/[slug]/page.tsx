import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import DoctorLanding from '@/components/DoctorLanding'
import { notFound } from 'next/navigation'
import { Medico } from '@/types/database'

const fallbackMedicos: Record<string, Medico> = {
  'pablo-vega': {
    id: 'pablo-vega',
    nombre: 'Dr. Pablo Vega',
    especialidad: 'Cirugía Plástica y Reconstructiva',
    matricula: 'M.N. 170504',
    foto_url: '/images/team/DOMA_Personal-9.jpg',
    video_url: '',
    curriculum: [
      'Especialista en Cirugía plástica estética y reconstructiva',
      'Experto en Lipoescultura HD y técnicas avanzadas',
      'Experiencia en Cirugía corporal de alta precisión',
      'Procedimientos realizados en sanatorios de alta complejidad',
    ],
    trayectoria:
      'Especialista en cirugía plástica y contorno corporal avanzado con amplia experiencia en procedimientos de alta precisión. Su enfoque está orientado a lograr resultados naturales, definidos y seguros de cada paciente.',
    slug: 'pablo-vega',
  },
  'majo-arauz': {
    id: 'majo-arauz',
    nombre: 'Dra. Majo Arauz',
    especialidad: 'Cirugía Facial y Medicina Estética',
    matricula: 'M.N. 174190',
    foto_url: '/images/team/DOMA_Personal-10.jpg',
    video_url: '',
    curriculum: [
      'Especialista en rejuvenecimiento facial',
      'Cirugía facial y medicina estética',
      'Resultados naturales y armónicos',
    ],
    trayectoria:
      'Médica especializada en rejuvenecimiento y armonización facial, enfocada en lograr resultados naturales y equilibrados respetando la identidad de cada paciente. Trabaja con técnicas avanzadas tanto quirúrgicas como de medicina estética, priorizando la precisión, la seguridad y un enfoque personalizado.',
    slug: 'majo-arauz',
  },
}

// Generación estática para SEO y rendimiento
export async function generateStaticParams() {
  if (!isSupabaseConfigured) {
    return Object.keys(fallbackMedicos).map((slug) => ({ slug }))
  }

  let dbSlugs: Array<{ slug: string }> = []

  try {
    const { data: medicos } = await supabase.from('medicos').select('slug')
    dbSlugs = medicos?.map((m) => ({ slug: m.slug })) || []
  } catch {
    dbSlugs = []
  }

  const fallbackSlugs = Object.keys(fallbackMedicos).map((slug) => ({ slug }))

  return [...dbSlugs, ...fallbackSlugs]
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params

  if (!isSupabaseConfigured) {
    const fallback = fallbackMedicos[slug]
    if (!fallback) notFound()
    return <DoctorLanding medico={fallback} galeria={[]} />
  }

  // 1. Obtener datos del médico por slug
  let medico: Medico | null = null
  let medicoError: unknown = null

  try {
    const response = await supabase
      .from('medicos')
      .select('*')
      .eq('slug', slug)
      .single()

    medico = (response.data as Medico | null) || null
    medicoError = response.error
  } catch (error) {
    medicoError = error
  }

  const medicoFinal = !medicoError && medico ? medico : fallbackMedicos[slug]

  if (!medicoFinal) {
    notFound()
  }

  // 2. Obtener galería de resultados para este médico
  let galeria: any[] = []

  try {
    const { data } = await supabase
      .from('antes_despues')
      .select('*')
      .eq('medico_id', medicoFinal.id)

    galeria = data || []
  } catch {
    galeria = []
  }

  return <DoctorLanding medico={medicoFinal} galeria={galeria} />
}
