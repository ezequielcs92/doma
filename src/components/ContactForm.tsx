'use client'

import { useState } from 'react'
import { Lead } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react'

export default function ContactForm({ medicoId, formTitle, formSubtitle }: { medicoId: string; formTitle?: string; formSubtitle?: string }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const tratamiento = (formData.get('tratamiento') as string) || 'No especificado'
    const consulta = (formData.get('mensaje') as string) || ''
    const lead: Lead = {
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: formData.get('telefono') as string,
      mensaje: `Tratamiento de interes: ${tratamiento}\n${consulta}`,
      medico_id: medicoId,
    }

    try {
      const { error: insertError } = await supabase.from('leads').insert([lead])
      if (insertError) throw insertError
      setSuccess(true)
    } catch {
      setError('Hubo un error al enviar tus datos. Por favor intenta de nuevo.')
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
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-2xl shadow-doma-violet/5 border border-doma-light/30 space-y-5">
      <h3 className="text-2xl font-black text-doma-dark mb-2 text-center">{formTitle || 'Agenda tu evaluación personalizada'}</h3>
      <p className="text-sm text-doma-muted text-center mb-4">{formSubtitle || 'Evaluación médica personalizada según tu caso.'}</p>

      <div>
        <label className="block text-sm font-bold mb-2 text-doma-dark">Nombre Completo</label>
        <input
          name="nombre"
          required
          type="text"
          placeholder="Tu nombre"
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-doma-dark">Email</label>
          <input
            name="email"
            required
            type="email"
            placeholder="tu@email.com"
            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-doma-dark">Teléfono</label>
          <input
            name="telefono"
            required
            type="tel"
            placeholder="+54 9 11 ..."
            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 text-doma-dark">Tratamiento de interes</label>
        <select
          name="tratamiento"
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
        <label className="block text-sm font-bold mb-2 text-doma-dark">Tu Consulta</label>
        <textarea
          name="mensaje"
          rows={3}
          placeholder="¿En qué podemos ayudarte?"
          className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400 resize-none"
        ></textarea>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
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

      <p className="text-[11px] text-gray-400 text-center leading-relaxed">
        Al enviar, aceptás nuestras políticas de privacidad y el tratamiento confidencial de tus datos.
      </p>
    </form>
  )
}
