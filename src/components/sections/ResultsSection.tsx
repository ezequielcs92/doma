'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import { cn } from '@/lib/utils'
import { X, ZoomIn } from 'lucide-react'

const categories = [
  'Todos',
  'Lipoescultura HD',
  'Body Lifting',
  'Cirugía Glútea',
  'Medicina Estética',
]

const results = [
  {
    id: 1,
    title: 'Lipodermoescultura',
    category: 'Lipoescultura HD',
    before: '/images/results/lipodermoescultura-antes.webp',
    after: '/images/results/lipodermoescultura-despues.webp',
  },
  {
    id: 2,
    title: 'Lipoescultura HD',
    category: 'Lipoescultura HD',
    before: '/images/results/lipoescultura-hd-antes.webp',
    after: '/images/results/lipoescultura-hd-despues.webp',
  },
  {
    id: 3,
    title: 'Body Lifting',
    category: 'Body Lifting',
    before: '/images/results/body-lifting-antes.webp',
    after: '/images/results/body-lifting-despues.webp',
  },
  {
    id: 4,
    title: 'Cirugía Glútea',
    category: 'Cirugía Glútea',
    before: '/images/results/cirugia-glutea-antes.webp',
    after: '/images/results/cirugia-glutea-despues.webp',
  },
  {
    id: 5,
    title: 'Relleno Labial',
    category: 'Medicina Estética',
    before: '/images/results/medicina-estetica-antes.webp',
    after: '/images/results/medicina-estetica-despues.webp',
  },
]

export default function ResultsSection() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (lightbox === null) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setLightbox(null)
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      openerRef.current?.focus()
    }
  }, [lightbox])

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
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-3xl bg-doma-light/20 border border-doma-light/40">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
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
                    onClick={(event) => {
                      openerRef.current = event.currentTarget
                      setLightbox(result.id)
                    }}
                    aria-label={`Ampliar resultado: ${result.title}`}
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="result-lightbox-title"
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <h2 id="result-lightbox-title" className="sr-only">
            Comparación ampliada del resultado seleccionado
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar galería"
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
