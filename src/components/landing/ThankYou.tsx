'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { consumePendingLead, trackLeadConversion } from '@/lib/conversion'

const links = [
  { href: '/equipo', label: 'Conocé a nuestro equipo' },
  { href: '/resultados', label: 'Mirá resultados reales' },
  { href: '/tratamientos', label: 'Explorá los tratamientos' },
]

// Only reachable right after a successful form submission: the form leaves a
// one-time flag in sessionStorage. Without it (direct visit, reload) the
// visitor is sent home, so the conversion is counted exactly once.
export default function ThankYou() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const handled = useRef(false)

  useEffect(() => {
    // Effects run twice in development; consume the flag only once.
    if (handled.current) return
    handled.current = true
    const lead = consumePendingLead()
    if (!lead) {
      router.replace('/')
      return
    }
    trackLeadConversion(lead)
    // sessionStorage only exists in the browser, so this can't be derived during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true)
  }, [router])

  if (!ready) return <main className="min-h-screen bg-surface" />

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center space-y-8">
        <Link href="/" aria-label="DOMA Sculpt Center" className="inline-block">
          <Image
            src="/images/logos/DOMA_LOGO-DOMA-VIOLETA.svg"
            alt="DOMA Sculpt Center"
            width={140}
            height={40}
            className="h-10 w-auto mx-auto"
          />
        </Link>
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-doma-light/40 space-y-4">
          <div className="w-20 h-20 rounded-full bg-doma-mint/50 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-doma-accent" />
          </div>
          <h1 className="text-3xl font-black text-doma-dark">¡Gracias por tu consulta!</h1>
          <p className="text-doma-muted">
            Recibimos tus datos. Un asesor de DOMA se va a comunicar con vos en las próximas 24
            horas hábiles.
          </p>
        </div>
        <div className="space-y-4">
          <p className="font-bold text-doma-dark">Mientras te contactamos:</p>
          <div className="grid gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 border border-doma-light/40 font-bold text-doma-violet hover:border-doma-accent transition-colors"
              >
                {link.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
