import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/sections/ContactSection'

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
