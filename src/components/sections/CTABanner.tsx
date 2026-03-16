'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-doma-violet to-doma-dark" />
      <div className="absolute inset-0 bg-[url('/images/team/DOMA.jpg')] bg-cover bg-center opacity-10" />

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-doma-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            ¿Lista para dar el paso?
            <br />
            <span className="text-doma-accent">
              Tu evaluación es gratuita.
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Agenda tu consulta sin cargo y descubrí cómo podemos ayudarte a
            alcanzar la mejor versión de vos misma.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="#contacto" className="btn-primary !text-base group">
              Agendar Evaluación
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+5491100000000"
              className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 hover:!text-white flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Llamar Ahora
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
