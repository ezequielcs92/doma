import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
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
// links to the main site only where they add trust. An ad group can deep-link
// a treatment with ?tratamiento=<slug>: the headline, the form, the doctor
// order and the WhatsApp message all follow it (message match).
type Props = { searchParams: Promise<{ tratamiento?: string }> }

const PHONE_DISPLAY = '+54 9 11 3025-3305'
const PHONE_HREF = 'tel:+5491130253305'
const RESPONSE_NOTE = 'Te contactamos dentro de las 24 horas hábiles.'

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const selected = findLandingTreatment((await searchParams).tratamiento)
  return {
    title: selected
      ? `${selected.name} en Belgrano | DOMA Sculpt Center`
      : 'Evaluación personalizada | DOMA Sculpt Center',
    description: selected
      ? `${selected.description} Agendá tu evaluación personalizada en DOMA Sculpt Center, Belgrano.`
      : 'Cirugía plástica y medicina estética en Belgrano. Agendá tu evaluación personalizada con nuestro equipo médico.',
    robots: { index: false, follow: true },
  }
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

const trustItems = [
  { icon: ShieldCheck, text: 'Cirujanos plásticos matriculados' },
  { icon: Award, text: 'Sanatorios de alta complejidad' },
  { icon: MonitorSmartphone, text: 'Consultas virtuales y presenciales' },
  { icon: MapPin, text: 'Belgrano, CABA' },
]

const steps = [
  {
    title: 'Dejás tus datos',
    text: 'Completás el formulario o nos escribís por WhatsApp. Lleva menos de un minuto.',
  },
  {
    title: 'Evaluamos tu caso',
    text: 'Coordinamos una consulta virtual o presencial con el especialista indicado para vos.',
  },
  {
    title: 'Recibís tu plan',
    text: 'Definimos el tratamiento adecuado y te acompañamos en todo el proceso.',
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

const faqs = [
  {
    question: '¿La evaluación tiene costo?',
    answer: 'No. La evaluación inicial es sin cargo: analizamos tu caso y te explicamos qué opciones tenés.',
  },
  {
    question: '¿Puedo hacer la consulta de forma virtual?',
    answer:
      'Sí. Hacemos consultas virtuales y presenciales, así que podés empezar desde donde estés y venir al centro cuando haga falta.',
  },
  {
    question: '¿Quién me va a atender?',
    answer:
      'El Dr. Pablo Vega (M.N. 170504), especialista en cirugía plástica y contorno corporal, o la Dra. Majo Arauz (M.N. 174190), especialista en cirugía facial y medicina estética, según el tratamiento.',
  },
  {
    question: '¿Dónde se realizan las cirugías?',
    answer: 'En sanatorios de alta complejidad, con el equipo y las condiciones de seguridad necesarias.',
  },
  {
    question: '¿Cuánto cuesta el tratamiento?',
    answer:
      'Depende de cada caso. Por eso primero hacemos la evaluación: con eso definimos qué necesitás y te informamos el valor.',
  },
  {
    question: '¿Qué pasa después de enviar el formulario?',
    answer:
      'Un asesor de DOMA se comunica con vos dentro de las 24 horas hábiles para coordinar la evaluación en el día y la modalidad que te queden mejor.',
  },
]

export default async function EvaluacionPage({ searchParams }: Props) {
  const { tratamiento } = await searchParams
  const selected = findLandingTreatment(tratamiento)
  const whatsappMessage = selected
    ? `Hola, quiero consultar por ${selected.name}`
    : 'Hola, quiero agendar una evaluación'
  const otherTreatments = LANDING_TREATMENTS.filter((treatment) => treatment.slug !== selected?.slug)
  const orderedDoctors = selected
    ? [...doctors].sort((a, b) => Number(b.slug === selected.doctor) - Number(a.slug === selected.doctor))
    : doctors

  return (
    <div className="pb-24 lg:pb-0">
      {/* Header: logo and direct contact, no navigation */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
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
          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-white/90 hover:text-white"
            >
              <Phone className="w-4 h-4 text-doma-accent" />
              {PHONE_DISPLAY}
            </a>
            <WhatsAppButton
              message={whatsappMessage}
              className="hidden sm:inline-flex rounded-full bg-white/10 border border-white/25 text-white text-sm font-bold px-4 py-2 hover:bg-white/20 transition-colors"
            >
              WhatsApp
            </WhatsAppButton>
          </div>
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
                {selected ? 'DOMA Sculpt Center · Belgrano, CABA' : 'Cirugía plástica y medicina estética · Belgrano'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                {selected ? (
                  <>
                    {selected.name}:{' '}
                    <span className="text-doma-accent">resultados naturales, pensados para vos.</span>
                  </>
                ) : (
                  <>
                    Resultados naturales,{' '}
                    <span className="text-doma-accent">pensados para vos.</span>
                  </>
                )}
              </h1>
              <p className="text-lg text-white/75 max-w-lg leading-relaxed">
                {selected
                  ? selected.description
                  : 'Evaluamos tu caso y definimos el mejor camino para lograr el resultado que buscás, con un enfoque médico, tecnología avanzada y seguimiento personalizado.'}
              </p>
              <ul className="space-y-3">
                {(selected
                  ? selected.highlights
                  : ['Evaluación médica personalizada', 'Consultas virtuales y presenciales', 'Cirujanos plásticos matriculados']
                ).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/85">
                    <CheckCircle2 className="w-5 h-5 text-doma-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="formulario" className="flex lg:justify-end scroll-mt-6">
              <div className="w-full max-w-md">
                <ContactForm
                  key={`top-${selected?.slug ?? 'general'}`}
                  medicoId="web-general"
                  idPrefix="landing"
                  compact
                  showEmail={false}
                  defaultProcedure={selected?.formValue}
                  formSubtitle="Evaluación inicial sin cargo, virtual o presencial."
                  footnote={RESPONSE_NOTE}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-doma-dark border-t border-white/10">
          <ul className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustItems.map((item) => (
              <li key={item.text} className="flex items-center gap-2.5 text-sm font-semibold text-white/85">
                <item.icon className="w-5 h-5 text-doma-accent shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-black text-doma-dark text-center mb-12">
              Cómo es el proceso
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-3xl bg-surface p-8 border border-doma-light/40">
                  <span className="text-4xl font-black text-doma-accent">0{index + 1}</span>
                  <h3 className="mt-3 text-xl font-black text-doma-dark">{step.title}</h3>
                  <p className="mt-2 text-doma-muted leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="text-center mt-10">
              <a href="#formulario" className="btn-primary">
                Quiero mi evaluación
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Treatments (no photos: body images can limit ad delivery) */}
        <section className="py-16 lg:py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            {selected ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className="rounded-3xl bg-white p-8 lg:p-10 border border-doma-accent/40 shadow-lg">
                  <p className="text-doma-accent font-bold text-xs uppercase tracking-widest mb-3">Tu consulta</p>
                  <h2 className="text-3xl font-black text-doma-dark mb-4">{selected.name}</h2>
                  <p className="text-doma-muted leading-relaxed mb-6">{selected.description}</p>
                  <ul className="space-y-2.5 mb-8">
                    {selected.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2.5 text-doma-dark font-semibold">
                        <CheckCircle2 className="w-5 h-5 text-doma-accent shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <a href="#formulario" className="btn-primary">
                    Quiero mi evaluación
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-doma-dark mb-2">Otros tratamientos</h2>
                  <p className="text-doma-muted mb-6">Si tu consulta es por otro tratamiento, elegilo acá.</p>
                  <TreatmentLinks treatments={otherTreatments} />
                </div>
              </div>
            ) : (
              <>
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-black text-doma-dark">¿Qué tratamiento te interesa?</h2>
                  <p className="text-doma-muted text-lg">
                    Elegí uno y lo dejamos seleccionado en el formulario. Si tenés dudas, te asesoramos en la
                    evaluación.
                  </p>
                </div>
                <TreatmentLinks treatments={otherTreatments} columns />
              </>
            )}
          </div>
        </section>

        {/* Why DOMA */}
        <section className="py-16 lg:py-20 bg-white">
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

        {/* Team */}
        <section className="py-16 lg:py-20 bg-surface">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-black text-doma-dark text-center mb-12">
              Nuestro equipo médico
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {orderedDoctors.map((doctor) => (
                <div key={doctor.slug} className="rounded-3xl overflow-hidden border border-doma-light/40 bg-white">
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
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-black text-doma-dark text-center mb-12">
              Lo que dicen nuestras pacientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="rounded-3xl bg-surface p-8 border border-doma-light/40">
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

        {/* FAQ */}
        <section className="py-16 lg:py-20 bg-surface">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-black text-doma-dark text-center mb-10">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl bg-white border border-doma-light/40 px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-bold text-doma-dark [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 shrink-0 text-doma-violet transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 text-doma-muted leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA with a second form */}
        <section className="py-16 lg:py-20 bg-doma-dark">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-white">
                Empezá tu cambio con un equipo especializado
              </h2>
              <p className="text-white/70 text-lg">
                Te acompañamos en todo el proceso, desde la evaluación hasta el resultado final, con un enfoque
                personalizado y seguro.
              </p>
              <p className="inline-flex items-center gap-2 text-doma-accent font-bold">
                <MonitorSmartphone className="w-5 h-5" />
                Hacemos consultas virtuales y presenciales
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <WhatsAppButton
                  message={whatsappMessage}
                  className="btn-secondary !border-white/30 !text-white hover:!bg-white/10"
                />
                <a
                  href={PHONE_HREF}
                  className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Llamar
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <ContactForm
                  key={`bottom-${selected?.slug ?? 'general'}`}
                  medicoId="web-general"
                  idPrefix="landing-bottom"
                  compact
                  showEmail={false}
                  defaultProcedure={selected?.formValue}
                  formSubtitle="Evaluación inicial sin cargo, virtual o presencial."
                  footnote={RESPONSE_NOTE}
                />
              </div>
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
              <a href={PHONE_HREF} className="hover:text-white transition-colors">
                {PHONE_DISPLAY}
              </a>
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

// Compact, clickable treatment list. Each link reloads the landing with that
// treatment selected, which also preselects it in both forms.
function TreatmentLinks({
  treatments,
  columns = false,
}: {
  treatments: typeof LANDING_TREATMENTS
  columns?: boolean
}) {
  return (
    <ul className={columns ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-3'}>
      {treatments.map((treatment) => (
        <li key={treatment.slug}>
          <Link
            href={`/evaluacion?tratamiento=${treatment.slug}#formulario`}
            className="group flex h-full items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 border border-doma-light/40 hover:border-doma-accent hover:shadow-md transition-all"
          >
            <span>
              <span className="block font-black text-doma-dark">{treatment.name}</span>
              <span className="block text-sm text-doma-muted">{treatment.highlights.slice(0, 2).join(' · ')}</span>
            </span>
            <ArrowRight className="w-4 h-4 shrink-0 text-doma-violet group-hover:translate-x-1 transition-transform" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
