'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { ArrowRight, Sparkles, Activity, Syringe, Eye, Scissors, Droplets } from 'lucide-react'
import { cn } from '@/lib/utils'

const treatments = [
  {
    icon: Scissors,
    title: 'Lipoescultura HD',
    description:
      'Definición corporal de alta precisión que permite resaltar la musculatura y mejorar el contorno corporal de forma natural. Utilizamos varias tecnologías logrando resultados más definidos y una recuperación más rápida.',
    features: ['Mayor definición muscular', 'Recuperación más rápida', 'Resultados naturales'],
    cta: 'Consultar con el especialista',
    image: '/images/treatments/lipoescultura-hd.webp',
  },
  {
    icon: Sparkles,
    title: 'Abdominoplastia',
    description:
      'Cirugía que permite eliminar el exceso de piel y grasa abdominal, logrando un abdomen más firme, plano y definido. Ideal para pacientes con flacidez, diástasis o cambios post embarazo.',
    features: ['Técnicas avanzadas', 'Resultados duraderos', 'Definición corporal 360'],
    cta: 'Quiero mi evaluación',
    image: '/images/treatments/abdominoplastia.webp',
  },
  {
    icon: Activity,
    title: 'Body Lifting',
    description:
      'Cirugía integral que permite redefinir el contorno corporal trabajando múltiples zonas en una misma intervención, logrando una silueta más estilizada, armónica y natural. Ideal para pacientes que buscan un cambio corporal completo.',
    features: ['Combinación de técnicas', 'Mayor definición corporal', 'Resultados armónicos'],
    cta: 'Consultar con el especialista',
    image: '/images/treatments/body-lifting.webp',
  },
  {
    icon: Syringe,
    title: 'Cirugía Mamaria',
    description:
      'Procedimientos diseñados para mejorar la forma, el tamaño, volumen y armonía de las mamas, adaptados a las características y objetivos de cada paciente.',
    features: ['Aumento mamario', 'Mastopexia', 'Recambio de implantes'],
    cta: 'Quiero mi evaluación',
    image: '/images/team/pablo-vega.webp',
  },
  {
    icon: Droplets,
    title: 'Cirugía Glútea',
    description:
      'Procedimientos diseñados para mejorar la forma, proyección y volumen de los glúteos, logrando un contorno más armónico y natural.',
    features: ['Implantes glúteos', 'Transferencia glútea', 'Resultados naturales'],
    cta: 'Quiero mi evaluación',
    image: '/images/treatments/cirugia-glutea.webp',
  },
  {
    icon: Eye,
    title: 'Cirugía Facial',
    description:
      'Procedimientos diseñados para rejuvenecer y armonizar el rostro, mejorando la apariencia sin perder naturalidad.',
    features: ['Blefaroplastia', 'Lifting facial', 'Lifting de cejas'],
    cta: 'Quiero mi evaluación',
    image: '/images/team/majo-arauz.webp',
  },
  {
    icon: Sparkles,
    title: 'Medicina Estética',
    description:
      'Tratamientos no quirúrgicos diseñados para mejorar la calidad de la piel, prevenir el envejecimiento y realzar la armonía facial de forma natural.',
    features: ['Ácido hialurónico', 'Toxina botulínica', 'Skinboosters', 'Bioestimuladores'],
    cta: 'Quiero mi evaluación',
    image: '/images/treatments/medicina-estetica.webp',
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
              Diseñamos cada tratamiento de forma personalizada, combinando
              tecnología de última generación con la experiencia de nuestro
              equipo médico para lograr resultados naturales y armónicos.
            </p>
          </AnimatedSection>
        </div>

        {/* Treatment Selector - Desktop */}
        <AnimatedSection delay={0.3}>
          <div className="hidden lg:grid grid-cols-7 gap-2 mb-12">
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
                  {active.cta || 'Consultar por este tratamiento'}
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
              <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all">
                <div
                  className="h-52 bg-cover bg-center"
                  style={{ backgroundImage: `url(${t.image})` }}
                />
                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-doma-accent/20 flex items-center justify-center">
                    <t.icon className="w-6 h-6 text-doma-accent" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{t.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {t.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-doma-accent text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-doma-accent text-sm font-bold hover:gap-3 transition-all"
                  >
                    {t.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
