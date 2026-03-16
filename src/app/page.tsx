import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import TreatmentsSection from '@/components/sections/TreatmentsSection'
import TeamSection from '@/components/sections/TeamSection'
import ResultsSection from '@/components/sections/ResultsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import CTABanner from '@/components/sections/CTABanner'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TreatmentsSection />
      <TeamSection />
      <CTABanner />
      <ResultsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
