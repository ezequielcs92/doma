import type { Metadata } from 'next'
import AnalyticsConsentControls from '@/components/AnalyticsConsentControls'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Política de Privacidad | DOMA Sculpt Center',
  description: 'Información sobre el tratamiento de datos personales en el sitio de DOMA Sculpt Center.',
}

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pb-24 pt-32">
        <article className="mx-auto max-w-4xl px-6">
          <header className="mb-10">
            <p className="inline-flex rounded-full bg-doma-violet/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-doma-violet">
              Privacidad y datos personales
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-doma-dark lg:text-6xl">
              Política de Privacidad
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-doma-muted">
              Esta página es una base informativa preliminar para explicar de
              manera clara cómo DOMA Sculpt Center trata datos personales. No
              reemplaza una política validada por asesoría legal y debe ser
              revisada antes de considerarse una versión legal definitiva.
            </p>
            <p className="mt-3 text-sm font-semibold text-doma-violet">
              Última actualización informativa: 23 de julio de 2026.
            </p>
          </header>

          <div className="space-y-6 text-doma-muted">
            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 shadow-lg shadow-doma-light/20 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">1. Responsable y contacto</h2>
              <p className="mt-4 leading-relaxed">
                El sitio se identifica comercialmente como DOMA Sculpt Center,
                con atención en Av. del Libertador 5990, Belgrano, Ciudad de
                Buenos Aires, Argentina. Para consultas sobre privacidad o para
                ejercer derechos, podés escribir a{' '}
                <a className="font-bold text-doma-violet underline" href="mailto:info@domasculpt.com">
                  info@domasculpt.com
                </a>{' '}
                o llamar al{' '}
                <a className="font-bold text-doma-violet underline" href="tel:+5491130253305">
                  +54 9 11 3025-3305
                </a>
                . La razón social, CUIT y datos registrales del responsable no
                se encuentran confirmados en este sitio y deberán incorporarse
                luego de su validación legal.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">2. Datos que podemos tratar</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
                <li>Nombre, correo electrónico, teléfono y contenido de consultas.</li>
                <li>Tratamiento o profesional de interés y datos necesarios para coordinar una evaluación.</li>
                <li>Datos técnicos limitados de navegación: ruta visitada e identificador aleatorio de sesión, solo si aceptás analytics.</li>
                <li>Información clínica o de salud que brindes durante la atención médica, incluyendo antecedentes, evaluaciones, imágenes y consentimientos cuando corresponda.</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Te pedimos que no incluyas datos clínicos sensibles innecesarios
                en los formularios generales del sitio. Su tratamiento requiere
                medidas reforzadas de confidencialidad y debe limitarse al equipo
                asistencial y personal autorizado.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">3. Finalidades y fundamento</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
                <li>Responder consultas y coordinar turnos o evaluaciones, a partir de tu solicitud y consentimiento.</li>
                <li>Brindar atención y seguimiento médico, gestionar documentación clínica y cumplir obligaciones sanitarias y legales aplicables.</li>
                <li>Proteger el sitio, prevenir abusos y mantener su funcionamiento seguro.</li>
                <li>Medir el uso de las páginas y mejorar la experiencia únicamente con tu consentimiento previo para analytics.</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Podés rechazar analytics sin perder acceso al sitio ni a sus
                servicios esenciales. La atención médica y el tratamiento de
                datos clínicos se rigen además por el consentimiento informado,
                el deber de confidencialidad profesional y la normativa aplicable.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">4. Supabase y otros encargados</h2>
              <p className="mt-4 leading-relaxed">
                DOMA utiliza Supabase como proveedor tecnológico para almacenar
                consultas y, cuando existe consentimiento, registrar métricas de
                navegación. Supabase actúa como proveedor o encargado de
                tratamiento según la configuración contratada y puede procesar
                datos mediante infraestructura ubicada fuera de Argentina.
                Antes de publicar una versión legal definitiva deben verificarse
                la región de alojamiento, las transferencias internacionales,
                las cláusulas contractuales y las medidas de seguridad vigentes.
              </p>
              <p className="mt-4 leading-relaxed">
                También podrán intervenir proveedores de hosting, soporte o
                comunicaciones estrictamente necesarios, sujetos a instrucciones,
                confidencialidad y acceso limitado. No se informa venta de datos
                personales.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">5. Analytics y almacenamiento local</h2>
              <p className="mt-4 leading-relaxed">
                El banner guarda tu elección de aceptar o rechazar analytics en
                el almacenamiento local del navegador. Si aceptás, se crea un
                identificador aleatorio en <span className="font-semibold text-doma-dark">sessionStorage</span>,
                que desaparece al finalizar la sesión del navegador. No se
                registra ninguna vista antes de tu aceptación. Podés retirar el
                consentimiento o cambiar tu elección con los controles
                siguientes. También podés eliminar los datos del sitio desde la
                configuración del navegador; al volver a cargar, el banner
                solicitará una nueva elección.
              </p>
              <AnalyticsConsentControls />
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">6. Conservación orientativa</h2>
              <p className="mt-4 leading-relaxed">
                Como criterio preliminar sujeto a validación, las consultas
                comerciales deberían conservarse hasta 24 meses desde el último
                contacto y los eventos analíticos hasta 12 meses. Los datos
                clínicos, consentimientos e historia de atención deben conservarse
                durante los plazos exigidos por la normativa sanitaria y de
                responsabilidad profesional aplicable. Al vencer cada plazo, los
                datos deberían eliminarse o anonimizarse, salvo obligación legal,
                defensa de derechos o una necesidad asistencial vigente.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">7. Tus derechos</h2>
              <p className="mt-4 leading-relaxed">
                Podés solicitar acceso, actualización, rectificación, supresión
                o confidencialidad de tus datos, o retirar un consentimiento
                cuando corresponda, escribiendo al contacto indicado. Será
                necesario verificar razonablemente tu identidad. El alcance y
                los plazos de respuesta quedan sujetos a la legislación argentina
                aplicable y a las excepciones vinculadas con documentación clínica
                u obligaciones legales.
              </p>
            </section>

            <section className="rounded-3xl border border-doma-light/50 bg-white p-7 lg:p-9">
              <h2 className="text-2xl font-black text-doma-dark">8. Seguridad y cambios</h2>
              <p className="mt-4 leading-relaxed">
                Se deben aplicar controles técnicos y organizativos acordes con
                la sensibilidad de los datos, aunque ningún sistema garantiza
                seguridad absoluta. Esta base informativa podrá actualizarse para
                reflejar cambios operativos, normativos o de proveedores. La
                versión definitiva deberá indicar responsable legal, jurisdicción,
                plazos confirmados y mecanismos formales de ejercicio de derechos.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
