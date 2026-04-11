'use client'

import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import { cn } from '@/lib/utils'
import { X, ZoomIn } from 'lucide-react'

const categories = ['Todos', 'Liposucción HD', 'Abdominoplastia', 'Facial']

const results = [
  {
    id: 1,
    title: 'Liposucción HD Abdominal',
    category: 'Liposucción HD',
    before: '/images/team/DOMA_Personal-11.jpg',
    after: '/images/team/DOMA_Personal-12.jpg',
  },
  {
    id: 2,
    title: 'Definición Corporal 360°',
    category: 'Liposucción HD',
    before: '/images/team/DOMA_Personal-13.jpg',
    after: '/images/team/DOMA_Personal-3.jpg',
  },
  {
    id: 3,
    title: 'Abdominoplastia con Lipo',
    category: 'Abdominoplastia',
    before: '/images/team/DOMA_Personal-4.jpg',
    after: '/images/team/DOMA_Personal-5.jpg',
  },
  {
    id: 4,
    title: 'Rejuvenecimiento Facial',
    category: 'Facial',
    before: '/images/team/DOMA_Personal-6.jpg',
    after: '/images/team/DOMA_Personal-7.jpg',
  },
]

export default function ResultsSection() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered =
    activeCategory === 'Todos'
      ? results
      : results.filter((r) => r.category === activeCategory)

  return (
    <section
      id="resultados"
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-white to-surface pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <AnimatedSection>
            <SectionLabel>Galería de Resultados</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-black text-doma-dark leading-tight">
              Resultados reales
              <br />
              <span className="gradient-text">de nuestros pacientes</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-doma-muted max-w-2xl mx-auto text-lg">
              Cada resultado es único y refleja un trabajo personalizado según
              las características de cada paciente. Todas las imágenes cuentan
              con consentimiento y corresponden a casos reales.
            </p>
          </AnimatedSection>
        </div>

        {/* Category Filter */}
        <AnimatedSection delay={0.3} className="flex justify-center mb-12">
          <div className="inline-flex gap-2 p-1.5 rounded-full bg-doma-light/20 border border-doma-light/40">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-doma-violet text-white shadow-md'
                    : 'text-doma-muted hover:text-doma-dark hover:bg-white/80'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((result, index) => (
            <AnimatedSection key={result.id} delay={0.1 * index}>
              <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-doma-light/30 hover:shadow-xl hover:shadow-doma-violet/10 transition-all duration-500">
                <BeforeAfterSlider
                  before={result.before}
                  after={result.after}
                  alt={result.title}
                />

                {/* Info */}
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-doma-dark">{result.title}</h4>
                    <p className="text-sm text-doma-muted">{result.category}</p>
                  </div>
                  <button
                    onClick={() => setLightbox(result.id)}
                    className="w-10 h-10 rounded-full bg-doma-light/30 flex items-center justify-center hover:bg-doma-accent/10 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4 text-doma-dark" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.5} className="text-center mt-16">
          <a href="/contacto" className="btn-primary">
            Quiero un resultado similar
          </a>
        </AnimatedSection>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const item = results.find((r) => r.id === lightbox)
              if (!item) return null
              return (
                <BeforeAfterSlider
                  before={item.before}
                  after={item.after}
                  alt={item.title}
                />
              )
            })()}
          </div>
        </div>
      )}
    </section>
  )
}
