import { supabase } from '@/lib/supabase'
import DoctorLanding from '@/components/DoctorLanding'
import { notFound } from 'next/navigation'
import { Medico } from '@/types/database'

const fallbackMedicos: Record<string, Medico> = {
  'doctor-1': {
    id: 'doctor-1',
    nombre: 'Dr. Profesional 1',
    especialidad: 'Cirugia Plastica y Reconstructiva',
    matricula: 'M.N. 00000',
    foto_url: '/images/team/DOMA_Personal-9.jpg',
    video_url: '',
    curriculum: [
      'Especialista en Cirugia Plastica',
      'Miembro de la SACPER',
      'Formacion en tecnicas avanzadas de liposuccion HD',
    ],
    trayectoria:
      'Profesional con amplia experiencia en procedimientos de contorno corporal y cirugia estetica de alta precision, enfocado en resultados armonicos y naturales.',
    slug: 'doctor-1',
  },
  'doctor-2': {
    id: 'doctor-2',
    nombre: 'Dr. Profesional 2',
    especialidad: 'Cirugia Estetica Corporal',
    matricula: 'M.N. 00001',
    foto_url: '/images/team/DOMA_Personal-10.jpg',
    video_url: '',
    curriculum: [
      'Especialista en Definicion Corporal',
      'Fellow en Cirugia Estetica Avanzada',
      'Instructor en tecnicas de Body Contouring',
    ],
    trayectoria:
      'Cirujano enfocado en definicion corporal avanzada, con protocolos de recuperacion optimizados y un abordaje personalizado para cada paciente.',
    slug: 'doctor-2',
  },
}

// Generación estática para SEO y rendimiento
export async function generateStaticParams() {
  const { data: medicos } = await supabase.from('medicos').select('slug')
  return medicos?.map((m) => ({ slug: m.slug })) || []
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params

  // 1. Obtener datos del médico por slug
  const { data: medico, error: medicoError } = await supabase
    .from('medicos')
    .select('*')
    .eq('slug', slug)
    .single()

  const medicoFinal = !medicoError && medico ? medico : fallbackMedicos[slug]

  if (!medicoFinal) {
    notFound()
  }

  // 2. Obtener galería de resultados para este médico
  const { data: galeria } = await supabase
    .from('antes_despues')
    .select('*')
    .eq('medico_id', medicoFinal.id)

  return <DoctorLanding medico={medicoFinal} galeria={galeria || []} />
}
