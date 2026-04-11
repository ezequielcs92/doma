'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { Heart, Microscope, Users } from 'lucide-react'

const values = [
  {
    icon: Microscope,
    title: 'Tecnología que mejora tus resultados',
    description:
      'Utilizamos equipamiento avanzado para lograr mejor precisión, mejor definición y una recuperación más controlada.',
  },
  {
    icon: Heart,
    title: 'Evaluación médica real',
    description:
      'Analizamos tu caso en detalle para definir si necesitás cirugía o un tratamiento y cuál es la mejor opción para vos.',
  },
  {
    icon: Users,
    title: 'Experiencia en resultados reales',
    description:
      'Equipo con formación en cirugía y medicina estética.',
  },
]

export default function AboutSection() {
  return (
    <section id="nosotros" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Composition */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative">
              {/* Main image */}
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/team/DOMA_Personal.jpg"
                  alt="Instalaciones DOMA Sculpt Center"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlapping small image */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/team/DOMA_Personal-2.jpg"
                  alt="Equipo DOMA"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Accent corner */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-l-4 border-t-4 border-doma-accent rounded-tl-2xl pointer-events-none" />
            </div>
          </AnimatedSection>

          {/* Content */}
          <div className="space-y-8">
            <AnimatedSection>
              <SectionLabel>Sobre Nosotros</SectionLabel>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-4xl lg:text-5xl font-black text-doma-dark leading-tight">
                Tu confianza
                <br />
                <span className="gradient-text">es nuestro compromiso</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg text-doma-muted leading-relaxed">
                Evaluamos tu caso y definimos el mejor camino para lograr
                el resultado que buscás, con un enfoque médico, tecnología
                avanzada y seguimiento personalizado.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-base text-doma-muted/80 leading-relaxed">
                Somos un centro especializado en definición corporal y
                cirugía estética avanzada, diseñado para ofrecer una
                experiencia integral desde la primera consulta hasta el
                seguimiento post-operatorio.
              </p>
            </AnimatedSection>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {values.map((value, index) => (
                <AnimatedSection key={index} delay={0.4 + index * 0.1}>
                  <div className="group p-5 rounded-2xl bg-white border border-doma-light/50 hover:border-doma-accent/30 hover:shadow-lg hover:shadow-doma-accent/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-doma-light/30 flex items-center justify-center mb-4 group-hover:bg-doma-accent/10 transition-colors">
                      <value.icon className="w-6 h-6 text-doma-violet group-hover:text-doma-accent transition-colors" />
                    </div>
                    <h4 className="font-bold text-doma-dark text-sm mb-2">
                      {value.title}
                    </h4>
                    <p className="text-xs text-doma-muted leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
