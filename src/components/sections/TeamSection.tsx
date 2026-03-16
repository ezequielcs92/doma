'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { ArrowRight, Award, GraduationCap } from 'lucide-react'

const doctors = [
  {
    name: 'Dr. Profesional 1',
    specialty: 'Cirugía Plástica y Reconstructiva',
    matricula: 'M.N. 00000',
    image: '/images/team/DOMA_Personal-9.jpg',
    credentials: [
      'Especialista en Cirugía Plástica',
      'Miembro de la SACPER',
      'Formación en técnicas avanzadas de liposucción HD',
    ],
    slug: 'doctor-1',
  },
  {
    name: 'Dr. Profesional 2',
    specialty: 'Cirugía Estética Corporal',
    matricula: 'M.N. 00001',
    image: '/images/team/DOMA_Personal-10.jpg',
    credentials: [
      'Especialista en Definición Corporal',
      'Fellow en Cirugía Estética Avanzada',
      'Instructor en técnicas de Body Contouring',
    ],
    slug: 'doctor-2',
  },
]

export default function TeamSection() {
  return (
    <section id="equipo" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <AnimatedSection>
            <SectionLabel>Equipo Médico</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-black text-doma-dark leading-tight">
              Profesionales de
              <br />
              <span className="gradient-text">excelencia comprobada</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-doma-muted max-w-2xl mx-auto text-lg">
              Nuestro equipo combina formación de primer nivel con amplia
              experiencia en procedimientos estéticos avanzados.
            </p>
          </AnimatedSection>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {doctors.map((doctor, index) => (
            <AnimatedSection
              key={index}
              delay={0.1 * index}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-doma-violet/10 border border-doma-light/30 transition-all duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Photo */}
                  <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-doma-dark/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />

                    {/* Mobile name overlay */}
                    <div className="absolute bottom-4 left-4 md:hidden">
                      <h3 className="text-2xl font-black text-white">
                        {doctor.name}
                      </h3>
                      <p className="text-doma-accent font-semibold text-sm">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8 flex flex-col justify-center space-y-5">
                    <div className="hidden md:block">
                      <p className="text-doma-accent font-bold text-xs uppercase tracking-widest mb-2">
                        {doctor.specialty}
                      </p>
                      <h3 className="text-2xl font-black text-doma-dark">
                        {doctor.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-doma-muted text-sm">
                      <Award className="w-4 h-4 text-doma-accent" />
                      <span>{doctor.matricula}</span>
                    </div>

                    <div className="space-y-3">
                      {doctor.credentials.map((cred, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <GraduationCap className="w-4 h-4 text-doma-violet mt-0.5 shrink-0" />
                          <span className="text-sm text-doma-muted">
                            {cred}
                          </span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={`/medico/${doctor.slug}`}
                      className="inline-flex items-center gap-2 text-doma-accent font-bold text-sm pt-4 group/link hover:gap-3 transition-all"
                    >
                      Ver perfil completo
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-16">
          <p className="text-doma-muted mb-6">
            ¿Querés saber más sobre nuestro equipo?
          </p>
          <a href="#contacto" className="btn-primary">
            Solicitar una evaluación
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
