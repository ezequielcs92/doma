'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import WhatsAppButton from '@/components/landing/WhatsAppButton'
import { cn } from '@/lib/utils'

// Call to action that slides in once the hero form is out of view and hides
// again while either form is on screen, so it never covers the fields.
export default function StickyCta({ whatsappMessage }: { whatsappMessage: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const forms = Array.from(document.querySelectorAll('[data-landing-form]'))
    const onScreen = new Set<Element>()
    let scrolled = false

    const update = () => setVisible(scrolled && onScreen.size === 0)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target)
          else onScreen.delete(entry.target)
        }
        update()
      },
      { threshold: 0.15 }
    )
    forms.forEach((form) => observer.observe(form))

    const handleScroll = () => {
      scrolled = window.scrollY > 240
      update()
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Mobile: full-width bar */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 lg:hidden bg-white/95 backdrop-blur border-t border-doma-light/60 p-3 flex gap-3 transition-transform duration-500 ease-out',
          visible ? 'translate-y-0' : 'translate-y-full'
        )}
        aria-hidden={!visible}
      >
        <a
          href="#formulario"
          tabIndex={visible ? 0 : -1}
          className="btn-primary animate-pulse-glow flex-1 !py-3 !px-4 !text-sm"
        >
          Solicitar evaluación
        </a>
        <WhatsAppButton
          message={whatsappMessage}
          className="rounded-full bg-[#25D366] text-white font-bold !py-3 px-4 text-sm"
        >
          WhatsApp
        </WhatsAppButton>
      </div>

      {/* Desktop: floating button */}
      <a
        href="#formulario"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={cn(
          'btn-primary animate-pulse-glow group !hidden lg:!inline-flex !fixed bottom-8 right-8 z-50 !py-3.5 !px-6 !text-sm transition-all duration-500',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        )}
      >
        Quiero mi evaluación
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </>
  )
}
