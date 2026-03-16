import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TreatmentsSection from '@/components/sections/TreatmentsSection'
import CTABanner from '@/components/sections/CTABanner'
import ContactSection from '@/components/sections/ContactSection'

export default function TratamientosPage() {
  return (
    <>
      <Navbar />
      <main>
        <TreatmentsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
