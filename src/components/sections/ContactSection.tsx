'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import {
  CheckCircle2,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react'

export default function ContactSection() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: formData.get('telefono') as string,
      mensaje: formData.get('mensaje') as string,
      medico_id: 'web-general',
    }

    try {
      const { error: insertError } = await supabase
        .from('leads')
        .insert([data])
      if (insertError) throw insertError
      setSuccess(true)
    } catch {
      setError('Hubo un error al enviar tu consulta. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contacto"
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <AnimatedSection>
            <SectionLabel>Contacto</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-black text-doma-dark leading-tight">
              Dá el primer paso hacia
              <br />
              <span className="gradient-text">tu transformación</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-doma-muted max-w-2xl mx-auto text-lg">
              Completá el formulario y un asesor te contactará para coordinar
              tu evaluación sin cargo.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <AnimatedSection
            direction="left"
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: 'Teléfono',
                  value: '+54 9 11 3025-3305',
                  href: 'tel:+5491130253305',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'info@domasculpt.com',
                  href: 'mailto:info@domasculpt.com',
                },
                {
                  icon: MapPin,
                  label: 'Dirección',
                  value: 'AV del Libertador 5990, Belgrano',
                  href: '#',
                },
                {
                  icon: Clock,
                  label: 'Horarios',
                  value: 'Lunes a viernes de 11:00am a 19:00hs',
                  href: '#',
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-doma-light/40 hover:border-doma-accent/30 hover:shadow-lg hover:shadow-doma-accent/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-doma-light/30 flex items-center justify-center group-hover:bg-doma-accent/10 transition-colors shrink-0">
                    <item.icon className="w-5 h-5 text-doma-violet group-hover:text-doma-accent transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-doma-muted mb-1">
                      {item.label}
                    </p>
                    <p className="font-bold text-doma-dark text-sm">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Trust note */}
            <div className="p-6 rounded-2xl bg-doma-light/20 border border-doma-light/40">
              <p className="text-xs text-doma-muted leading-relaxed">
                🔒 Tus datos están protegidos. No compartimos tu información
                con terceros. Tu consulta es 100% confidencial y sin
                compromiso.
              </p>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="right" className="lg:col-span-3">
            {success ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl border border-doma-light/30 text-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-doma-mint/50 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-doma-accent" />
                </div>
                <h3 className="text-2xl font-black text-doma-dark mb-3">
                  ¡Consulta Enviada!
                </h3>
                <p className="text-doma-muted max-w-sm">
                  Un asesor de DOMA se pondrá en contacto con vos en las
                  próximas 24 horas hábiles.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-3xl shadow-2xl shadow-doma-violet/5 border border-doma-light/30 space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold mb-2 text-doma-dark">
                    Nombre Completo
                  </label>
                  <input
                    name="nombre"
                    required
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-doma-dark">
                      Email
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-doma-dark">
                      Teléfono
                    </label>
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
                  <label className="block text-sm font-bold mb-2 text-doma-dark">
                    ¿Qué procedimiento te interesa?
                  </label>
                  <select
                    name="procedimiento"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-doma-accent/50 focus:border-doma-accent transition-all bg-surface/50 text-doma-dark"
                  >
                    <option value="">Seleccioná una opción</option>
                    <option value="lipoescultura-hd">Lipoescultura HD</option>
                    <option value="abdominoplastia">Abdominoplastia</option>
                    <option value="body-lifting">Body Lifting</option>
                    <option value="cirugia-mamaria">Cirugía Mamaria</option>
                    <option value="cirugia-glutea">Cirugía Glútea</option>
                    <option value="cirugia-facial">Cirugía Facial</option>
                    <option value="medicina-estetica">Medicina Estética</option>
                    <option value="mommy-makeover">Mommy Makeover</option>
                    <option value="asesoramiento">Quiero asesoramiento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-doma-dark">
                    Tu Consulta
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows={4}
                    placeholder="Contanos qué te gustaría mejorar o cualquier duda que tengas..."
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
                  className="btn-primary w-full !py-4 !text-base group"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Solicitar Evaluación Gratuita
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                  Al enviar, aceptás nuestras políticas de privacidad y el
                  tratamiento confidencial de tus datos.
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
