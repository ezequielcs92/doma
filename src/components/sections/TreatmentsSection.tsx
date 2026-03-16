'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { ArrowRight, Sparkles, Activity, Syringe, Eye, Scissors, Droplets } from 'lucide-react'
import { cn } from '@/lib/utils'

const treatments = [
  {
    icon: Scissors,
    title: 'Liposucción HD',
    description:
      'Definición corporal de alta precisión con tecnología de ultrasonido. Resultados naturales y tiempo de recuperación reducido.',
    features: ['Tecnología VASER', 'Resultados inmediatos', 'Mínimamente invasivo'],
    image: '/images/team/DOMA_Personal-3.jpg',
  },
  {
    icon: Sparkles,
    title: 'Abdominoplastia',
    description:
      'Cirugía abdominal para lograr un contorno firme y estilizado. Técnicas avanzadas de mínima cicatriz.',
    features: ['Técnica mini-abdominoplastia', 'Recuperación asistida', 'Resultados duraderos'],
    image: '/images/team/DOMA_Personal-4.jpg',
  },
  {
    icon: Activity,
    title: 'Definición Corporal 360°',
    description:
      'Tratamiento integral que combina múltiples técnicas para lograr una silueta armónica y proporcionada.',
    features: ['Plan personalizado', 'Múltiples zonas', 'Enfoque integral'],
    image: '/images/team/DOMA_Personal-5.jpg',
  },
  {
    icon: Syringe,
    title: 'Rellenos y Bioestimulación',
    description:
      'Medicina estética avanzada con ácido hialurónico y bioestimuladores de colágeno para rejuvenecimiento facial.',
    features: ['Ácido hialurónico', 'Bioestimuladores', 'Sin cirugía'],
    image: '/images/team/DOMA_Personal-6.jpg',
  },
  {
    icon: Eye,
    title: 'Blefaroplastia',
    description:
      'Cirugía de párpados para una mirada rejuvenecida y descansada. Procedimiento ambulatorio con recuperación rápida.',
    features: ['Ambulatorio', 'Anestesia local', 'Resultado natural'],
    image: '/images/team/DOMA_Personal-7.jpg',
  },
  {
    icon: Droplets,
    title: 'Tratamientos Faciales',
    description:
      'Protocolos de medicina estética facial para lograr luminosidad, hidratación y un aspecto rejuvenecido.',
    features: ['Plasma rico en plaquetas', 'Skinbooster', 'Hilos tensores'],
    image: '/images/team/DOMA_Personal-8.jpg',
  },
]

export default function TreatmentsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = treatments[activeIndex]

  return (
    <section
      id="tratamientos"
      className="relative py-28 lg:py-36 bg-doma-dark overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-doma-violet via-doma-accent to-doma-violet" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-doma-violet/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-doma-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <AnimatedSection>
            <SectionLabel className="text-white">Tratamientos</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Procedimientos de
              <br />
              <span className="text-doma-accent">última generación</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Cada tratamiento es diseñado a medida. Combinamos tecnología
              avanzada con la experiencia de nuestros profesionales para
              resultados excepcionales.
            </p>
          </AnimatedSection>
        </div>

        {/* Treatment Selector - Desktop */}
        <AnimatedSection delay={0.3}>
          <div className="hidden lg:grid grid-cols-6 gap-2 mb-12">
            {treatments.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'p-4 rounded-2xl text-left transition-all duration-300',
                  i === activeIndex
                    ? 'bg-doma-accent text-white shadow-lg shadow-doma-accent/30'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                )}
              >
                <t.icon
                  className={cn(
                    'w-5 h-5 mb-2',
                    i === activeIndex ? 'text-white' : 'text-doma-accent'
                  )}
                />
                <span className="text-sm font-bold block">{t.title}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Active Treatment Detail - Desktop */}
        <AnimatedSection delay={0.4} className="hidden lg:block">
          <div className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="grid grid-cols-2">
              <div className="p-12 flex flex-col justify-center space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-doma-accent/20 flex items-center justify-center">
                  <active.icon className="w-7 h-7 text-doma-accent" />
                </div>
                <h3 className="text-3xl font-black text-white">{active.title}</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  {active.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {active.features.map((f, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-doma-accent text-sm font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <a
                  href="#contacto"
                  className="btn-primary self-start mt-4 group"
                >
                  Consultar por este tratamiento
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="relative min-h-[400px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${active.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-doma-dark/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Treatment Cards - Mobile */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {treatments.map((t, i) => (
            <AnimatedSection key={i} delay={0.1 * i}>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-doma-accent/20 flex items-center justify-center">
                  <t.icon className="w-6 h-6 text-doma-accent" />
                </div>
                <h4 className="text-lg font-bold text-white">{t.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t.description}
                </p>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-doma-accent text-sm font-bold hover:gap-3 transition-all"
                >
                  Más info <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
