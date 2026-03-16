import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ResultsSection from '@/components/sections/ResultsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTABanner from '@/components/sections/CTABanner'

export default function ResultadosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <ResultsSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
