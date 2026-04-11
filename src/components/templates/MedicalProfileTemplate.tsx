'use client'

import Image from 'next/image'
import { Medico, AntesDespues } from '@/types/database'
import ContactForm from '@/components/ContactForm'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Navbar from '@/components/layout/Navbar'
import MedicalFooter from '@/components/layout/MedicalFooter'
import {
  GraduationCap,
  Award,
  PlayCircle,
  ArrowRight,
  Shield,
  Star,
  CheckCircle2,
  Quote,
  MessageCircle,
} from 'lucide-react'

type MedicalProfileTemplateProps = {
  medico: Medico
  galeria: AntesDespues[]
}

// ─── Per-doctor content configuration ───

type DoctorConfig = {
  heroSubtitle: string
  heroCta: string
  trustBadges: { icon: typeof Award; text: string }[]
  circleBadge: string
  servicesSubtitle: string
  services: { title: string; description: string }[]
  profileText: string
  bullets: string[]
  testimonials: { name: string; text: string; procedure: string }[]
  formTitle: string
  formSubtitle: string
}

const doctorConfigs: Record<string, DoctorConfig> = {
  'pablo-vega': {
    heroSubtitle:
      'Especialista en cirugía plástica estética y reconstructiva, con enfoque en resultados naturales y seguridad del paciente. Cada procedimiento es planificado de forma personalizada, priorizando la armonía y el acompañamiento en todo el proceso.',
    heroCta: 'Quiero mi evaluación',
    trustBadges: [
      { icon: Shield, text: 'Procedimientos en sanatorios de alta complejidad' },
      { icon: Award, text: 'Atención personalizada en cada etapa' },
      { icon: Star, text: 'Resultados naturales y armónicos' },
    ],
    circleBadge: 'Equipo médico especializado en estética y cirugía plástica.',
    servicesSubtitle:
      'Cirugías diseñadas de forma personalizada, combinando tecnología avanzada y experiencia médica para lograr resultados naturales y seguros.',
    services: [
      {
        title: 'Lipoescultura HD',
        description:
          'Definición corporal de alta precisión que permite eliminar la grasa localizada y resaltar la musculatura logrando una silueta más armónica y definida.',
      },
      {
        title: 'Abdominoplastia',
        description:
          'Cirugía que elimina el exceso de piel y grasa abdominal logrando un abdomen más firme, plano y estilizado. Ideal para casos de flacidez o post embarazo.',
      },
      {
        title: 'Mommy Makeover (Cirugía combinada)',
        description:
          'Procedimiento integral que combina diferentes cirugías (abdomen-mamas-glúteos) para recuperar la figura post embarazo logrando un contorno más firme, armónico y natural.',
      },
      {
        title: 'Body Lifting',
        description:
          'Procedimiento integral que combina múltiples técnicas para remodelar el contorno corporal en distintas zonas, logrando una silueta más definida y proporcionada. Uno de los procedimientos que más eligen nuestras pacientes.',
      },
      {
        title: 'Cirugía Mamaria',
        description:
          'Procedimientos orientados a mejorar la forma, volumen y simetría de las mamas, logrando resultados armónicos y naturales según cada paciente.',
      },
      {
        title: 'Cirugía Glútea',
        description:
          'Cirugías que mejoran la proyección, forma y volumen de los glúteos logrando un contorno corporal equilibrado y natural.',
      },
    ],
    profileText:
      'Especialista en cirugía plástica y contorno corporal avanzado con amplia experiencia en procedimientos de alta precisión. Su enfoque está orientado a lograr resultados naturales, definidos y seguros de cada paciente.',
    bullets: [
      'Especialista en Cirugía plástica estética y reconstructiva',
      'Experto en Lipoescultura HD y técnicas avanzadas',
      'Experiencia en Cirugía corporal de alta precisión',
      'Procedimientos realizados en sanatorios de alta complejidad',
    ],
    testimonials: [],
    formTitle: 'Agenda tu evaluación personalizada',
    formSubtitle: 'Evaluación médica personalizada según tu caso.',
  },
  'majo-arauz': {
    heroSubtitle:
      'Especialista en cirugía facial y medicina estética, orientada en lograr resultados naturales que realzan la expresión sin modificar la esencia. Cada tratamiento es planificado de forma personalizada, acompañando al paciente en todo el proceso.',
    heroCta: 'Quiero mi evaluación',
    trustBadges: [
      { icon: Shield, text: 'Especialista en rejuvenecimiento facial' },
      { icon: Award, text: 'Tratamientos personalizados' },
      { icon: Star, text: 'Resultados naturales y progresivos' },
    ],
    circleBadge: 'Equipo médico especializado en estética y cirugía plástica.',
    servicesSubtitle:
      'Procedimientos realizados con protocolo médico, planificación a medida y tecnología de vanguardia.',
    services: [
      {
        title: 'Lifting cervicofacial',
        description:
          'Rejuvenecimiento integral del rostro y cuello, mejorando la flacidez y redefiniendo los contornos faciales con resultados naturales y duraderos.',
      },
      {
        title: 'Blefaroplastia',
        description:
          'Cirugía de párpados para rejuvenecer la mirada, eliminando exceso de piel y logrando un aspecto más descansado y fresco.',
      },
      {
        title: 'Lifting de cejas',
        description:
          'Eleva y reposiciona las cejas, abriendo la mirada y suavizando la expresión del rostro.',
      },
      {
        title: 'Lip lift',
        description:
          'Define y acorta la distancia entre la nariz y el labio superior, logrando labios más armónicos sin necesidad de rellenos.',
      },
      {
        title: 'Medicina estética facial',
        description:
          'Tratamientos personalizados con toxina botulínica, ácido hialurónico y bioestimuladores, orientados a mejorar la calidad de la piel y lograr un rejuvenecimiento natural y armónico.',
      },
    ],
    profileText:
      'Médica especializada en rejuvenecimiento y armonización facial, enfocada en lograr resultados naturales y equilibrados respetando la identidad de cada paciente. Trabaja con técnicas avanzadas tanto quirúrgicas como de medicina estética, priorizando la precisión, la seguridad y un enfoque personalizado.',
    bullets: [
      'Especialista en rejuvenecimiento facial',
      'Cirugía facial y medicina estética',
      'Resultados naturales y armónicos',
    ],
    testimonials: [
      {
        name: 'Noelia R.',
        text: 'Su dedicación y profesionalismo son admirables. La recomiendo ampliamente. Es muy competente y atenta. Gracias Dra. Majo.',
        procedure: 'Cirugía facial',
      },
      {
        name: 'Jahaira C.',
        text: 'Muy feliz con los resultados, eres una genia. Me encanta siempre acudir con vos, los resultados son hermosos siempre, re naturales. Muchas gracias.',
        procedure: 'Medicina estética',
      },
      {
        name: 'Verónica G.',
        text: 'El acompañamiento de la Dra. Majo es excelente, de altísima calidad humana. Ella no solo ha realizado una cirugía impecable, en la que no padecí dolor, y ha estado presente en cada duda, consulta y necesidad que me ha surgido durante el proceso. Gracias Majito, sos de excelencia.',
        procedure: 'Cirugía facial',
      },
    ],
    formTitle: 'Agenda tu evaluación personalizada',
    formSubtitle: 'Evaluación médica personalizada según tu caso.',
  },
}

const defaultConfig: DoctorConfig = {
  heroSubtitle:
    'Perfil médico orientado a resultados naturales, seguridad del paciente y acompañamiento integral en cada etapa del tratamiento.',
  heroCta: 'Solicitar evaluación',
  trustBadges: [
    { icon: Award, text: 'Autoridad Médica Verificada' },
    { icon: Star, text: 'Resultados de Alta Precisión' },
  ],
  circleBadge: 'Equipo médico especializado en estética y cirugía plástica.',
  servicesSubtitle:
    'Procedimientos realizados con protocolo médico, planificación a medida y tecnología de vanguardia.',
  services: [],
  profileText: '',
  bullets: [],
  testimonials: [],
  formTitle: 'Agenda tu evaluación personalizada',
  formSubtitle: 'Evaluación médica personalizada según tu caso.',
}

export default function MedicalProfileTemplate({
  medico,
  galeria,
}: MedicalProfileTemplateProps) {
  const config = doctorConfigs[medico.slug] || defaultConfig

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* ─── Hero Section ─── */}
        <section className="relative pt-20 overflow-hidden bg-white border-b border-doma-light/40">
          <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-doma-light/30 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-doma-accent/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <AnimatedSection direction="left" className="space-y-7">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-doma-light/40 border border-doma-light text-doma-violet text-xs font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-doma-accent animate-pulse" />
                  {medico.especialidad}
                </span>

                <h1 className="text-4xl md:text-6xl font-black text-doma-dark leading-[1.05]">
                  {medico.nombre}
                </h1>

                <p className="text-lg text-doma-muted max-w-lg leading-relaxed">
                  {config.heroSubtitle}
                </p>

                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-doma-dark text-white text-sm font-semibold">
                  <Shield className="w-4 h-4 text-doma-accent" />
                  <span>Matrícula Profesional: {medico.matricula}</span>
                </div>

                <div className="flex flex-wrap gap-4 pt-3">
                  <a href="#contact" className="btn-primary group">
                    {config.heroCta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                  {config.trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-doma-muted text-sm">
                      <badge.icon className="w-4 h-4 text-doma-accent" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="relative">
                  <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-doma-light/50">
                    <Image
                      src={medico.foto_url}
                      alt={medico.nombre}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-5 -left-5 p-4 rounded-2xl bg-white border border-doma-light/70 shadow-xl max-w-[260px]">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="text-doma-accent w-5 h-5" />
                      <span className="font-black text-doma-dark text-sm">DOMA Sculpt Center</span>
                    </div>
                    <p className="text-xs text-doma-muted">{config.circleBadge}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ─── Especialidades y Servicios ─── */}
        {config.services.length > 0 && (
          <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection className="text-center mb-14 space-y-4">
                <h2 className="text-4xl font-black text-doma-dark">
                  Especialidades y <span className="gradient-text">Servicios</span>
                </h2>
                <p className="text-doma-muted max-w-2xl mx-auto text-lg">
                  {config.servicesSubtitle}
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.services.map((service, index) => (
                  <AnimatedSection key={service.title} delay={index * 0.08}>
                    <article className="rounded-3xl border border-doma-light/50 bg-surface p-7 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-doma-accent mt-0.5 shrink-0" />
                        <h3 className="text-xl font-black text-doma-dark">{service.title}</h3>
                      </div>
                      <p className="text-doma-muted leading-relaxed">{service.description}</p>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Video ─── */}
        {medico.video_url && (
          <section className="py-24 px-6 bg-doma-dark">
            <AnimatedSection className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Video de Presentación
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Conocé el enfoque médico, la filosofía de trabajo y el criterio profesional detrás de cada caso.
              </p>
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-900 border border-white/10 shadow-2xl group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                  <PlayCircle className="w-20 h-20 text-doma-accent opacity-80 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </AnimatedSection>
          </section>
        )}

        {/* ─── Perfil Profesional + Formulario ─── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <AnimatedSection direction="left">
              <div className="space-y-8">
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-doma-light/40 text-doma-violet font-bold text-xs uppercase tracking-widest border border-doma-light mb-6">
                    <span className="w-2 h-2 rounded-full bg-doma-accent animate-pulse" />
                    Trayectoria
                  </span>
                  <h2 className="text-3xl font-black text-doma-dark mt-4">
                    Perfil Profesional
                  </h2>
                </div>

                <p className="text-lg text-doma-muted leading-relaxed">
                  {config.profileText || medico.trayectoria}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(config.bullets.length > 0 ? config.bullets : medico.curriculum).map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-start p-4 rounded-2xl bg-surface border border-doma-light/30 hover:border-doma-accent/30 hover:shadow-md transition-all"
                    >
                      <GraduationCap className="w-5 h-5 text-doma-violet shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-doma-dark leading-snug">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="lg:sticky lg:top-32 h-fit">
              <div id="contact">
                <ContactForm medicoId={medico.id} formTitle={config.formTitle} formSubtitle={config.formSubtitle} />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ─── Testimonios ─── */}
        {config.testimonials.length > 0 && (
          <section className="py-24 px-6 bg-doma-dark">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection className="text-center mb-14 space-y-4">
                <h2 className="text-4xl font-black text-white">
                  Testimonios <span className="text-doma-accent">Reales</span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto text-lg">
                  Experiencias de pacientes atendidos por este profesional.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {config.testimonials.map((item, index) => (
                  <AnimatedSection key={index} delay={index * 0.1}>
                    <article className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                      <Quote className="w-7 h-7 text-doma-accent/40 mb-4" />
                      <p className="text-white/80 leading-relaxed mb-5">&quot;{item.text}&quot;</p>
                      <div className="pt-4 border-t border-white/10">
                        <p className="font-bold text-white text-sm">{item.name}</p>
                        <p className="text-doma-accent text-sm font-semibold">{item.procedure}</p>
                      </div>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Galería de Resultados ─── */}
        {galeria.length > 0 && (
          <section className="py-24 px-6 bg-gradient-to-b from-white to-surface">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-black text-doma-dark">
                  Resultados <span className="gradient-text">Reales</span>
                </h2>
                <p className="text-doma-muted font-medium">
                  Testimonio visual de nuestra excelencia médica
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galeria.map((result, i) => (
                  <AnimatedSection key={result.id} delay={0.1 * i}>
                    <div className="group overflow-hidden rounded-3xl bg-white shadow-lg border border-doma-light/30 hover:shadow-xl transition-all">
                      <div className="relative aspect-square">
                        <div className="grid grid-cols-2 h-full gap-[2px]">
                          <div className="relative overflow-hidden">
                            <Image src={result.url_antes} alt="Antes" fill className="object-cover" />
                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-[10px] rounded uppercase font-bold">
                              Antes
                            </div>
                          </div>
                          <div className="relative overflow-hidden">
                            <Image src={result.url_despues} alt="Después" fill className="object-cover" />
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-doma-accent text-white text-[10px] rounded uppercase font-bold">
                              Después
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-doma-dark">{result.titulo}</h4>
                        <p className="text-sm text-doma-muted">{result.categoria}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <div className="mt-16 text-center">
                <a href="/contacto" className="btn-primary">
                  Quiero un resultado similar
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ─── CTA Final ─── */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-doma-violet to-doma-dark" />
          <div className="absolute inset-0 bg-[url('/images/team/DOMA.jpg')] bg-cover bg-center opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-doma-accent/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8">
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Empezá tu cambio con
                <br />
                <span className="text-doma-accent">un equipo especializado</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-white/60 text-lg max-w-xl mx-auto">
                Te acompañamos en todo el proceso, desde la evaluación hasta el resultado final, con un enfoque personalizado y seguro.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-doma-accent font-semibold text-sm uppercase tracking-widest">
                Hacemos consultas virtuales y presenciales
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <a href="#contact" className="btn-primary !text-base group">
                  Agendar consulta
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/5491130253305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 hover:!text-white flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Hablar por WhatsApp
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <MedicalFooter />
    </>
  )
}
