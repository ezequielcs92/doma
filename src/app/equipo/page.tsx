import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TeamSection from '@/components/sections/TeamSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTABanner from '@/components/sections/CTABanner'

export default function EquipoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <TeamSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
