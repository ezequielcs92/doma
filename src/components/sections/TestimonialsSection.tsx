'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'María L.',
    procedure: 'Liposucción HD',
    rating: 5,
    text: 'Desde la primera consulta me sentí en confianza. El resultado superó mis expectativas. El equipo de DOMA es increíble, profesionales en todo sentido.',
    date: 'Hace 3 meses',
  },
  {
    name: 'Carolina P.',
    procedure: 'Abdominoplastia',
    rating: 5,
    text: 'Llevaba años postergando la decisión y fue la mejor decisión que tomé. La recuperación fue mucho mejor de lo que esperaba y el resultado es hermoso.',
    date: 'Hace 5 meses',
  },
  {
    name: 'Ana G.',
    procedure: 'Body Lifting',
    rating: 5,
    text: 'Lo que más destaco es la honestidad del equipo. Me explicaron exactamente qué esperar y cumplieron. El seguimiento post-operatorio fue impecable.',
    date: 'Hace 2 meses',
  },
  {
    name: 'Laura M.',
    procedure: 'Medicina Estética',
    rating: 5,
    text: 'Un resultado super natural, justo lo que quería. Se nota que los doctores tienen un ojo estético increíble. Las instalaciones son de primer nivel.',
    date: 'Hace 1 mes',
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )

  return (
    <section className="relative py-28 lg:py-36 bg-doma-dark overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-doma-violet/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-doma-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <AnimatedSection>
            <SectionLabel className="text-white">Testimonios</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Lo que dicen
              <br />
              <span className="text-doma-accent">nuestros pacientes</span>
            </h2>
          </AnimatedSection>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={0.1 * i}>
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-doma-accent/30 hover:bg-white/8 transition-all duration-300 h-full flex flex-col">
                <Quote className="w-8 h-8 text-doma-accent/30 mb-4" />

                <p className="text-white/70 leading-relaxed flex-1 text-base">
                  &quot;{t.text}&quot;
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-doma-accent text-xs font-medium">
                      {t.procedure}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star
                        key={si}
                        className="w-3.5 h-3.5 text-doma-accent fill-doma-accent"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <AnimatedSection>
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Quote className="w-8 h-8 text-doma-accent/30 mb-4" />
              <p className="text-white/70 leading-relaxed text-base min-h-[120px]">
                &quot;{testimonials[currentIndex].text}&quot;
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-doma-accent text-xs font-medium">
                    {testimonials[currentIndex].procedure}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({
                    length: testimonials[currentIndex].rating,
                  }).map((_, si) => (
                    <Star
                      key={si}
                      className="w-3.5 h-3.5 text-doma-accent fill-doma-accent"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-doma-accent transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-all',
                      i === currentIndex
                        ? 'bg-doma-accent w-8'
                        : 'bg-white/20'
                    )}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-doma-accent transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
