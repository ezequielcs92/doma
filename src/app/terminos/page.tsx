import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | DOMA Sculpt Center',
  description: 'Condiciones informativas de uso del sitio de DOMA Sculpt Center.',
}

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pb-24 pt-32">
        <article className="mx-auto max-w-4xl px-6">
          <header className="mb-10">
            <p className="inline-flex rounded-full bg-doma-violet/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-doma-violet">
              Uso del sitio
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-doma-dark lg:text-6xl">
              Términos y Condiciones
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-doma-muted">
              Estos términos constituyen una base informativa preliminar sobre
              el uso del sitio de DOMA Sculpt Center. Están sujetos a revisión
              legal y no deben considerarse una versión contractual definitiva.
            </p>
            <p className="mt-3 text-sm font-semibold text-doma-violet">
              Última actualización informativa: 23 de julio de 2026.
            </p>
          </header>

          <div className="space-y-6 text-doma-muted">
            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 shadow-lg shadow-doma-light/20 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">1. Identificación y aceptación</h2>
              <p className="mt-4 leading-relaxed">
                El sitio corresponde a DOMA Sculpt Center, con atención informada
                en Av. del Libertador 5990, Belgrano, Ciudad de Buenos Aires,
                Argentina. Podés contactarte por medio de{' '}
                <a className="font-bold text-doma-violet underline" href="mailto:info@domasculpt.com">info@domasculpt.com</a>{' '}
                o al <a className="font-bold text-doma-violet underline" href="tel:+5491130253305">+54 9 11 3025-3305</a>.
                No se publican razón social ni CUIT porque esos datos aún no están
                confirmados y deben completarse tras revisión legal. El acceso y
                navegación implican aceptar estas pautas informativas en lo que
                resulte aplicable.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">2. Alcance del contenido</h2>
              <p className="mt-4 leading-relaxed">
                La información sobre profesionales, procedimientos, resultados y
                recuperación es general y educativa. No constituye diagnóstico,
                indicación médica ni reemplaza una consulta presencial y una
                evaluación individual. Ante una urgencia médica, utilizá los
                servicios de emergencia correspondientes y no este sitio.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">3. Consultas, turnos y tratamientos</h2>
              <p className="mt-4 leading-relaxed">
                Enviar un formulario o mensaje no confirma un turno, no crea por
                sí solo una relación médico-paciente y no garantiza la realización
                de un procedimiento. La indicación, sus alternativas, costos,
                disponibilidad, preparación, riesgos y condiciones de cancelación
                deben ser confirmados directamente por DOMA y el profesional
                interviniente antes de contratar o consentir una práctica.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">4. Información clínica y consentimiento</h2>
              <p className="mt-4 leading-relaxed">
                Toda práctica requiere evaluación profesional y, cuando
                corresponda, consentimiento informado específico. Debés brindar
                información clínica veraz y suficiente, incluyendo antecedentes,
                medicación, alergias y otras condiciones relevantes. Los
                resultados varían según cada persona; las imágenes de antes y
                después son ilustrativas de casos individuales y no constituyen
                una promesa de resultado.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">5. Uso permitido</h2>
              <p className="mt-4 leading-relaxed">
                El sitio debe utilizarse de forma lícita y sin afectar su
                seguridad, disponibilidad o a terceros. No está permitido intentar
                acceder sin autorización a sistemas o datos, introducir código
                malicioso, automatizar consultas abusivas, suplantar identidades ni
                reutilizar imágenes clínicas fuera de los permisos aplicables.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">6. Propiedad intelectual y enlaces</h2>
              <p className="mt-4 leading-relaxed">
                Salvo indicación distinta, los textos, diseño, marcas, logotipos,
                fotografías y demás materiales del sitio no pueden reproducirse
                o explotarse sin autorización de sus titulares. Los enlaces a
                servicios externos se ofrecen como referencia; sus contenidos,
                disponibilidad y políticas dependen de terceros.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">7. Disponibilidad y responsabilidad</h2>
              <p className="mt-4 leading-relaxed">
                Se procura mantener información correcta y un servicio disponible,
                pero pueden existir interrupciones, errores o contenidos que
                requieran actualización. Nada en estas pautas excluye derechos
                irrenunciables de pacientes o consumidores ni responsabilidades
                que legalmente no puedan limitarse.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">8. Privacidad y proveedores</h2>
              <p className="mt-4 leading-relaxed">
                El tratamiento de consultas, datos clínicos y métricas opcionales
                se describe en la{' '}
                <Link className="font-bold text-doma-violet underline" href="/privacidad">
                  Política de Privacidad
                </Link>
                . El sitio utiliza Supabase como proveedor tecnológico. Analytics
                solo se activa con consentimiento y emplea un identificador de
                sesión, no uno persistente.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">9. Cambios y ley aplicable</h2>
              <p className="mt-4 leading-relaxed">
                Estas pautas podrán cambiar cuando se modifique el sitio, los
                servicios o la normativa. La versión legal definitiva deberá
                confirmar la identidad del responsable, domicilio contractual,
                ley y jurisdicción aplicables, respetando las normas imperativas
                argentinas de salud, datos personales, consumo y derechos de
                pacientes.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
