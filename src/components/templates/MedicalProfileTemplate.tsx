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
} from 'lucide-react'

type MedicalProfileTemplateProps = {
  medico: Medico
  galeria: AntesDespues[]
}

const doctorServices = [
  {
    title: 'Liposuccion HD',
    description:
      'Definicion corporal de alta precision con tecnologia de ultrasonido para resultados naturales y recuperacion optimizada.',
  },
  {
    title: 'Rinoplastia',
    description:
      'Armonizacion funcional y estetica de la nariz mediante tecnicas modernas y enfoque personalizado.',
  },
  {
    title: 'Blefaroplastia',
    description:
      'Rejuvenecimiento de la mirada con procedimientos seguros y resultados delicados.',
  },
  {
    title: 'Medicina Estetica Facial',
    description:
      'Protocolos integrales con bioestimuladores, rellenos y tecnologia regenerativa para una apariencia fresca y natural.',
  },
]

const testimonials = [
  {
    name: 'Paciente DOMA',
    text: 'Excelente acompanamiento desde la primera consulta. El resultado supero mis expectativas y me senti segura en todo momento.',
    procedure: 'Liposuccion HD',
  },
  {
    name: 'Paciente DOMA',
    text: 'La explicacion preoperatoria fue clara y profesional. Recomiendo al equipo por su calidad medica y humana.',
    procedure: 'Rinoplastia',
  },
]

export default function MedicalProfileTemplate({
  medico,
  galeria,
}: MedicalProfileTemplateProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
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
                  Perfil medico orientado a resultados naturales, seguridad del
                  paciente y acompanamiento integral en cada etapa del tratamiento.
                </p>

                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-doma-dark text-white text-sm font-semibold">
                  <Shield className="w-4 h-4 text-doma-accent" />
                  <span>Matricula Profesional: {medico.matricula}</span>
                </div>

                <div className="flex flex-wrap gap-4 pt-3">
                  <a href="#contact" className="btn-primary group">
                    Solicitar evaluacion
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                  {[
                    { icon: Award, text: 'Autoridad Medica Verificada' },
                    { icon: Star, text: 'Resultados de Alta Precision' },
                  ].map((badge, i) => (
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
                  <div className="absolute -bottom-5 -left-5 p-4 rounded-2xl bg-white border border-doma-light/70 shadow-xl max-w-[240px]">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="text-doma-accent w-5 h-5" />
                      <span className="font-black text-doma-dark text-sm">DOMA Sculpt Center</span>
                    </div>
                    <p className="text-xs text-doma-muted">Profesional medico validado para atencion estetica especializada.</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-14 space-y-4">
              <h2 className="text-4xl font-black text-doma-dark">
                Especialidades y <span className="gradient-text">Servicios</span>
              </h2>
              <p className="text-doma-muted max-w-2xl mx-auto text-lg">
                Procedimientos realizados con protocolo medico, planificacion a medida y tecnologia de vanguardia.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctorServices.map((service, index) => (
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

        {medico.video_url && (
          <section className="py-24 px-6 bg-doma-dark">
            <AnimatedSection className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Video de Presentacion
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Conoce el enfoque medico, la filosofia de trabajo y el criterio profesional detras de cada caso.
              </p>
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-900 border border-white/10 shadow-2xl group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                  <PlayCircle className="w-20 h-20 text-doma-accent opacity-80 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </AnimatedSection>
          </section>
        )}

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
                  {medico.trayectoria}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {medico.curriculum.map((item, index) => (
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
                <ContactForm medicoId={medico.id} />
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-24 px-6 bg-doma-dark">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-14 space-y-4">
              <h2 className="text-4xl font-black text-white">
                Testimonios de <span className="text-doma-accent">Pacientes</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                Prueba social real de pacientes atendidos con este profesional.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((item, index) => (
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

        {galeria.length > 0 && (
          <section className="py-24 px-6 bg-gradient-to-b from-white to-surface">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-black text-doma-dark">
                  Resultados <span className="gradient-text">Reales</span>
                </h2>
                <p className="text-doma-muted font-medium">
                  Testimonio visual de nuestra excelencia medica
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
                            <Image src={result.url_despues} alt="Despues" fill className="object-cover" />
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-doma-accent text-white text-[10px] rounded uppercase font-bold">
                              Despues
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
                <a href="#contact" className="btn-primary">
                  Quiero un resultado similar
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
      <MedicalFooter />
    </>
  )
}
