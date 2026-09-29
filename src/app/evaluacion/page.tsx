import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  MapPin,
  MonitorSmartphone,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import WhatsAppButton from '@/components/landing/WhatsAppButton'
import HeroBackground from '@/components/ui/HeroBackground'
import { findLandingTreatment, LANDING_TREATMENTS } from '@/lib/landing'
import { SITE_ADDRESS } from '@/lib/site'

// Landing for Google Ads traffic: no site navigation, one goal (the form),
// links to the main site only where they add trust.
export const metadata: Metadata = {
  title: 'Evaluación personalizada | DOMA Sculpt Center',
  description:
    'Cirugía plástica y medicina estética en Belgrano. Agendá tu evaluación personalizada con nuestro equipo médico.',
  robots: { index: false, follow: true },
}

const doctors = [
  {
    name: 'Dr. Pablo Vega',
    specialty: 'Cirugía Plástica y Reconstructiva',
    matricula: 'M.N. 170504',
    image: '/images/team/pablo-vega.webp',
    summary: 'Especialista en contorno corporal: Lipoescultura HD, abdominoplastia, body lifting y cirugía mamaria.',
    slug: 'pablo-vega',
  },
  {
    name: 'Dra. Majo Arauz',
    specialty: 'Cirugía Facial y Medicina Estética',
    matricula: 'M.N. 174190',
    image: '/images/team/majo-arauz.webp',
    summary: 'Especialista en rejuvenecimiento facial: cirugía facial y tratamientos de medicina estética.',
    slug: 'majo-arauz',
  },
]

const reasons = [
  {
    icon: Stethoscope,
    title: 'Evaluación médica real',
    text: 'Analizamos tu caso en detalle para definir si necesitás cirugía o un tratamiento, y cuál es la mejor opción para vos.',
  },
  {
    icon: Sparkles,
    title: 'Tecnología que mejora tus resultados',
    text: 'Equipamiento avanzado para lograr mejor precisión, mejor definición y una recuperación más controlada.',
  },
  {
    icon: Award,
    title: 'Experiencia en resultados reales',
    text: 'Equipo con formación en cirugía y medicina estética. Procedimientos en sanatorios de alta complejidad.',
  },
]

const testimonials = [
  {
    name: 'Noelia R.',
    text: 'Su dedicación y profesionalismo son admirables. La recomiendo ampliamente, es muy competente y atenta.',
  },
  {
    name: 'Jahaira C.',
    text: 'Muy feliz con los resultados. Los resultados son hermosos siempre, re naturales. Muchas gracias.',
  },
  {
    name: 'Verónica G.',
    text: 'El acompañamiento es excelente, de altísima calidad humana. Estuvo presente en cada duda y consulta durante todo el proceso.',
  },
]

export default async function EvaluacionPage({
  searchParams,
}: {
  searchParams: Promise<{ tratamiento?: string }>
}) {
  const { tratamiento } = await searchParams
  const selected = findLandingTreatment(tratamiento)
  const whatsappMessage = selected
    ? `Hola, quiero consultar por ${selected.name}`
    : 'Hola, quiero agendar una evaluación'

  return (
    <div className="pb-24 lg:pb-0">
      {/* Header: logo only, no navigation */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" aria-label="DOMA Sculpt Center">
            <Image
              src="/images/logos/DOMA_LOGO-DOMA-VIOLETA.svg"
              alt="DOMA Sculpt Center"
              width={140}
              height={40}
              className="h-9 w-auto brightness-0 invert"
              priority
            />
          </Link>
        </div>
      </header>

      <main>
        {/* Hero + form */}
        <section className="relative overflow-hidden bg-doma-dark">
          <div className="absolute inset-0">
            <HeroBackground />
            <div className="absolute inset-0 bg-gradient-to-r from-doma-dark/95 via-doma-dark/85 to-doma-dark/60" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16 lg:pt-36 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-doma-accent" />
                {selected ? selected.name : 'Cirugía plástica y medicina estética'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                Resultados naturales,{' '}
                <span className="text-doma-accent">pensados para vos.</span>
              </h1>
              <p className="text-lg text-white/75 max-w-lg leading-relaxed">
                {selected
                  ? selected.description
                  : 'Evaluamos tu caso y definimos el mejor camino para lograr el resultado que buscás, con un enfoque médico, tecnología avanzada y seguimiento personalizado.'}
              </p>
              <ul className="space-y-3">
                {[
                  'Evaluación médica personalizada',
                  'Consultas virtuales y presenciales',
                  'Cirujanos plásticos matriculados',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/85">
                    <CheckCircle2 className="w-5 h-5 text-doma-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="hidden lg:flex">
                <WhatsAppButton
                  message={whatsappMessage}
                  className="btn-secondary !border-white/30 !text-white hover:!bg-white/10"
                >
                  Prefiero escribir por WhatsApp
                </WhatsAppButton>
              </div>
            </div>

            <div id="formulario" className="flex lg:justify-end scroll-mt-6">
              <div className="w-full max-w-md">
                <ContactForm
                  medicoId="web-general"
                  idPrefix="landing"
                  compact
                  showEmail={false}
                  defaultProcedure={selected?.formValue}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why DOMA */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason) => (
              <div key={reason.title} className="rounded-3xl bg-surface p-8 border border-doma-light/40">
                <reason.icon className="w-8 h-8 text-doma-accent mb-4" />
                <h2 className="text-xl font-black text-doma-dark mb-2">{reason.title}</h2>
                <p className="text-doma-muted leading-relaxed">{reason.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Treatments (no photos: body images can limit ad delivery) */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black text-doma-dark">Tratamientos</h2>
              <p className="text-doma-muted text-lg">
                Cada tratamiento se diseña de forma personalizada, combinando tecnología de última
                generación con la experiencia de nuestro equipo médico.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {LANDING_TREATMENTS.map((treatment) => (
                <div
                  key={treatment.slug}
                  className={`rounded-3xl bg-white p-6 border flex flex-col ${
                    treatment.slug === selected?.slug ? 'border-doma-accent shadow-lg' : 'border-doma-light/40'
                  }`}
                >
                  <h3 className="text-lg font-black text-doma-dark mb-2">{treatment.name}</h3>
                  <p className="text-sm text-doma-muted leading-relaxed mb-4">{treatment.description}</p>
                  <ul className="mt-auto space-y-1.5">
                    {treatment.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm text-doma-dark">
                        <CheckCircle2 className="w-4 h-4 text-doma-accent shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a href="#formulario" className="btn-primary">
                Quiero mi evaluación
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-black text-doma-dark text-center mb-12">
              Nuestro equipo médico
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {doctors.map((doctor) => (
                <div key={doctor.slug} className="rounded-3xl overflow-hidden border border-doma-light/40 bg-surface">
                  <div className="relative aspect-[4/3]">
                    <Image src={doctor.image} alt={doctor.name} fill className="object-cover object-top" />
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-doma-accent font-bold text-xs uppercase tracking-widest">{doctor.specialty}</p>
                    <h3 className="text-2xl font-black text-doma-dark">{doctor.name}</h3>
                    <p className="flex items-center gap-2 text-sm text-doma-muted">
                      <ShieldCheck className="w-4 h-4 text-doma-accent" />
                      {doctor.matricula}
                    </p>
                    <p className="text-doma-muted">{doctor.summary}</p>
                    <Link
                      href={`/medico/${doctor.slug}`}
                      className="inline-flex items-center gap-2 text-doma-violet font-bold text-sm hover:gap-3 transition-all"
                    >
                      Ver perfil completo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-black text-doma-dark text-center mb-12">
              Lo que dicen nuestras pacientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="rounded-3xl bg-white p-8 border border-doma-light/40">
                  <div className="flex gap-1 mb-4" aria-label="5 estrellas">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-doma-accent text-doma-accent" />
                    ))}
                  </div>
                  <blockquote className="text-doma-dark leading-relaxed">“{testimonial.text}”</blockquote>
                  <figcaption className="mt-4 text-sm font-bold text-doma-muted">{testimonial.name}</figcaption>
                </figure>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/resultados"
                className="inline-flex items-center gap-2 text-doma-violet font-bold hover:gap-3 transition-all"
              >
                Ver más resultados
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-doma-dark">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Empezá tu cambio con un equipo especializado
            </h2>
            <p className="text-white/70 text-lg">
              Te acompañamos en todo el proceso, desde la evaluación hasta el resultado final, con
              un enfoque personalizado y seguro.
            </p>
            <p className="inline-flex items-center gap-2 text-doma-accent font-bold">
              <MonitorSmartphone className="w-5 h-5" />
              Hacemos consultas virtuales y presenciales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a href="#formulario" className="btn-primary">
                Agendar consulta
                <ArrowRight className="w-5 h-5" />
              </a>
              <WhatsAppButton
                message={whatsappMessage}
                className="btn-secondary !border-white/30 !text-white hover:!bg-white/10"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer: the only general link back to the site */}
      <footer className="bg-doma-dark border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-white/60">
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-doma-accent" />
              {SITE_ADDRESS}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-doma-accent" />
              +54 9 11 3025-3305
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-doma-accent" />
              Lunes a viernes de 11:00 a 19:00 hs
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <Link href="/" className="font-bold text-white hover:text-doma-accent transition-colors">
              Conocé DOMA Sculpt Center →
            </Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Política de privacidad
            </Link>
          </div>
        </div>
      </footer>

      {/* Mobile sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden bg-white/95 backdrop-blur border-t border-doma-light/60 p-3 flex gap-3">
        <a href="#formulario" className="btn-primary flex-1 !py-3 !px-4 !text-sm">
          Solicitar evaluación
        </a>
        <WhatsAppButton
          message={whatsappMessage}
          className="rounded-full bg-[#25D366] text-white font-bold !py-3 px-4 text-sm"
        >
          WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  )
}
