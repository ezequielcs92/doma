'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react'
import Turnstile from '@/components/Turnstile'

export default function ContactForm({ medicoId, formTitle, formSubtitle }: { medicoId: string; formTitle?: string; formSubtitle?: string }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileVersion, setTurnstileVersion] = useState(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const turnstileToken = String(formData.get('cf-turnstile-response') ?? '')
    const lead = {
      nombre: String(formData.get('nombre') ?? ''),
      email: String(formData.get('email') ?? ''),
      telefono: String(formData.get('telefono') ?? ''),
      mensaje: String(formData.get('mensaje') ?? ''),
      procedimiento: String(formData.get('procedimiento') ?? ''),
      medico_id: medicoId,
      website: String(formData.get('website') ?? ''),
      privacyAccepted: formData.get('privacyAccepted') === 'on',
      ...(turnstileToken ? { 'cf-turnstile-response': turnstileToken } : {}),
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
      const result: unknown = await response.json().catch(() => null)
      if (!response.ok) {
        const message =
          typeof result === 'object' &&
          result !== null &&
          'error' in result &&
          typeof result.error === 'string'
            ? result.error
            : 'Hubo un error al enviar tus datos. Por favor intenta de nuevo.'
        throw new Error(message)
      }
      setSuccess(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Hubo un error al enviar tus datos. Por favor intenta de nuevo.'
      )
      setTurnstileVersion((version) => version + 1)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-xl border border-doma-light/30 text-center min-h-[300px]">
        <div className="w-20 h-20 rounded-full bg-doma-mint/50 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-doma-accent" />
        </div>
        <h3 className="text-2xl font-black text-doma-dark mb-3">¡Solicitud Enviada!</h3>
        <p className="text-doma-muted">Un asesor se pondrá en contacto con vos a la brevedad.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative bg-white p-10 rounded-3xl shadow-2xl shadow-doma-violet/5 border border-doma-light/30 space-y-5">
      <h3 className="text-2xl font-black text-doma-dark mb-2 text-center">{formTitle || 'Agenda tu evaluación personalizada'}</h3>
      <p className="text-sm text-doma-muted text-center mb-4">{formSubtitle || 'Evaluación médica personalizada según tu caso.'}</p>

      <div>
        <label htmlFor="doctor-nombre" className="block text-sm font-bold mb-2 text-doma-dark">Nombre Completo</label>
        <input
          id="doctor-nombre"
          name="nombre"
          required
          type="text"
          autoComplete="name"
          maxLength={100}
          placeholder="Tu nombre"
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="doctor-email" className="block text-sm font-bold mb-2 text-doma-dark">Email</label>
          <input
            id="doctor-email"
            name="email"
            required
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="tu@email.com"
            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400"
          />
        </div>
        <div>
          <label htmlFor="doctor-telefono" className="block text-sm font-bold mb-2 text-doma-dark">Teléfono</label>
          <input
            id="doctor-telefono"
            name="telefono"
            required
            type="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="+54 9 11 ..."
            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="doctor-procedimiento" className="block text-sm font-bold mb-2 text-doma-dark">Tratamiento de interes</label>
        <select
          id="doctor-procedimiento"
          name="procedimiento"
          required
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark"
        >
          <option value="">Selecciona una opcion</option>
          <option value="Lipoescultura HD">Lipoescultura HD</option>
          <option value="Abdominoplastia">Abdominoplastia</option>
          <option value="Body Lifting">Body Lifting</option>
          <option value="Cirugia Mamaria">Cirugía Mamaria</option>
          <option value="Cirugia Glutea">Cirugía Glútea</option>
          <option value="Cirugia Facial">Cirugía Facial</option>
          <option value="Medicina Estetica">Medicina Estética</option>
          <option value="Mommy Makeover">Mommy Makeover</option>
          <option value="Quiero asesoramiento">Quiero asesoramiento</option>
        </select>
      </div>

      <div>
        <label htmlFor="doctor-mensaje" className="block text-sm font-bold mb-2 text-doma-dark">Tu Consulta</label>
        <textarea
          id="doctor-mensaje"
          name="mensaje"
          rows={3}
          maxLength={2000}
          placeholder="¿En qué podemos ayudarte?"
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400 resize-none"
        ></textarea>
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="doctor-website">Sitio web</label>
        <input id="doctor-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Turnstile key={turnstileVersion} />

      {error && (
        <div role="alert" aria-live="polite" className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full !py-4 group"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Quiero mi evaluación gratuita
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-gray-500">
        <input
          name="privacyAccepted"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-doma-violet"
        />
        <span>
          Acepto la{' '}
          <Link href="/privacidad" className="font-bold text-doma-violet underline">
            política de privacidad
          </Link>{' '}
          y el uso de mis datos para responder esta consulta.
        </span>
      </label>
    </form>
  )
}
