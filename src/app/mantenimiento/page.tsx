import type { Metadata } from 'next'
import Image from 'next/image'
import { Instagram, MessageCircle, Phone, Wrench } from 'lucide-react'
import { SITE_ADDRESS, SITE_INSTAGRAM_HANDLE, SITE_INSTAGRAM_URL, whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sitio en mantenimiento | DOMA Sculpt Center',
  robots: { index: false, follow: false },
}

// Shown for every public URL while MAINTENANCE_MODE is on (see src/proxy.ts).
export default function MantenimientoPage() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center space-y-8">
        <Image
          src="/images/logos/DOMA_LOGO-DOMA-VIOLETA.svg"
          alt="DOMA Sculpt Center"
          width={140}
          height={40}
          className="h-10 w-auto mx-auto"
          priority
        />
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-doma-light/40 space-y-4">
          <div className="w-20 h-20 rounded-full bg-doma-mint/50 flex items-center justify-center mx-auto">
            <Wrench className="w-10 h-10 text-doma-accent" />
          </div>
          <h1 className="text-3xl font-black text-doma-dark">Estamos mejorando el sitio</h1>
          <p className="text-doma-muted">
            Volvemos en breve. Mientras tanto seguimos atendiendo: escribinos o llamanos y
            coordinamos tu consulta.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappUrl('Hola, quiero hacer una consulta')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-doma-violet px-6 py-4 font-bold text-white hover:bg-doma-dark transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Escribinos por WhatsApp
          </a>
          <a
            href="tel:+5491130253305"
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 border border-doma-light/40 font-bold text-doma-violet hover:border-doma-accent transition-colors"
          >
            <Phone className="w-5 h-5" />
            +54 9 11 3025-3305
          </a>
        </div>
        <div className="space-y-2 text-sm text-doma-muted">
          <p>Lunes a viernes de 11 a 19 hs · {SITE_ADDRESS}</p>
          <a
            href={SITE_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-doma-violet hover:text-doma-dark transition-colors"
          >
            <Instagram className="w-4 h-4" />
            {SITE_INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </main>
  )
}
