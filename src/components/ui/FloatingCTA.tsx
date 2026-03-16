'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500',
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8 pointer-events-none'
      )}
    >
      {/* WhatsApp / Call */}
      <a
        href="tel:+5491100000000"
        className="w-14 h-14 rounded-full bg-doma-violet text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Llamar"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Main CTA */}
      <a
        href="#contacto"
        className="btn-primary animate-pulse-glow !py-3.5 !px-6 !text-sm group"
      >
        Agendar
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  )
}
