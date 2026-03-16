import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AboutSection from '@/components/sections/AboutSection'
import CTABanner from '@/components/sections/CTABanner'

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <AboutSection />

        <section className="py-20 lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-doma-violet/10 text-doma-violet text-xs font-bold uppercase tracking-widest">
                Nuestra Identidad
              </p>
              <h2 className="mt-5 text-4xl lg:text-5xl font-black text-doma-dark leading-tight">
                Mision y Vision
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <article className="rounded-3xl bg-white border border-doma-light/50 shadow-lg shadow-doma-light/20 p-8 lg:p-10">
                <h3 className="text-2xl font-extrabold text-doma-dark mb-4">
                  Mision
                </h3>
                <p className="text-doma-muted text-base leading-relaxed">
                  Brindar soluciones esteticas de alta calidad con enfoque
                  medico, humano y personalizado, combinando tecnologia,
                  seguridad y excelencia profesional para que cada paciente
                  logre resultados naturales y sostenibles en el tiempo.
                </p>
              </article>

              <article className="rounded-3xl bg-doma-dark border border-doma-violet/30 shadow-lg shadow-doma-dark/30 p-8 lg:p-10">
                <h3 className="text-2xl font-extrabold text-white mb-4">
                  Vision
                </h3>
                <p className="text-white/80 text-base leading-relaxed">
                  Ser el centro referente en cirugia y medicina estetica en
                  Argentina y la region, reconocido por su innovacion, etica
                  profesional y resultados de excelencia, elevando los
                  estandares de atencion integral en cada experiencia.
                </p>
              </article>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
