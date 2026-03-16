'use client'

import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

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
  const [showAfter, setShowAfter] = useState<Record<number, boolean>>({})

  const filtered =
    activeCategory === 'Todos'
      ? results
      : results.filter((r) => r.category === activeCategory)

  const toggleImage = (id: number) => {
    setShowAfter((prev) => ({ ...prev, [id]: !prev[id] }))
  }

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
              Resultados que
              <br />
              <span className="gradient-text">hablan por sí solos</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-doma-muted max-w-2xl mx-auto text-lg">
              Casos reales de nuestros pacientes. Todas las fotos son
              publicadas con consentimiento y representan resultados
              individuales.
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
                {/* Image Container - Interactive Before/After */}
                <div
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                  onClick={() => toggleImage(result.id)}
                >
                  <Image
                    src={showAfter[result.id] ? result.after : result.before}
                    alt={result.title}
                    fill
                    className="object-cover transition-all duration-500"
                  />

                  {/* Labels */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-bold uppercase',
                        showAfter[result.id]
                          ? 'bg-doma-accent text-white'
                          : 'bg-white/90 text-doma-dark'
                      )}
                    >
                      {showAfter[result.id] ? 'Después' : 'Antes'}
                    </span>
                  </div>

                  {/* Toggle hint */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                    Toca para ver {showAfter[result.id] ? 'antes' : 'después'}
                  </div>

                  {/* Zoom */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightbox(result.id)
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ZoomIn className="w-4 h-4 text-doma-dark" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-doma-dark">{result.title}</h4>
                    <p className="text-sm text-doma-muted">{result.category}</p>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-doma-light border border-doma-light" />
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full border transition-colors',
                        showAfter[result.id]
                          ? 'bg-doma-accent border-doma-accent'
                          : 'bg-transparent border-doma-light'
                      )}
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.5} className="text-center mt-16">
          <a href="#contacto" className="btn-primary">
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
            className="relative max-w-4xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const item = results.find((r) => r.id === lightbox)
              if (!item) return null
              return (
                <div className="grid grid-cols-2 h-full gap-1">
                  <div className="relative">
                    <Image
                      src={item.before}
                      alt="Antes"
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/90 text-doma-dark text-xs font-bold uppercase">
                      Antes
                    </span>
                  </div>
                  <div className="relative">
                    <Image
                      src={item.after}
                      alt="Después"
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-doma-accent text-white text-xs font-bold uppercase">
                      Después
                    </span>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </section>
  )
}
